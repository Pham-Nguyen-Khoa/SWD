import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import * as XLSX from 'xlsx';
import { hash } from "bcrypt"
import { error } from "console";
import { badRequest, errorResponse, notFound, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { join } from "path";
import * as pug from 'pug';
import { generateStudentCode } from "src/helpers/studentCode";

const rawPassword = "123456";


@Injectable()
export class ImportStudentService {
    constructor(private readonly prisma: PrismaService,
        private readonly mailService: MailService
    ) { }
    async importStudent(filePath: string, reqUser) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawData = XLSX.utils.sheet_to_json(sheet);
            const clearData = cleanAndFormatExcelData(rawData);
            const results: any = [];
            // Check file excel có bị trống chỗ nào không 
            for (const [index, row] of (clearData as any[]).entries()) {
                // const { fullName, dateOfBirth, class: className, email } = row;
                const studentName = row['Tên học sinh'];
                const studentEmail = row['Email'];
                const dateOfBirth = row['Ngày sinh'];
                const className = row['Lớp'];
                const gender = row['Giới tính'];

                const parentName = row['Tên phụ huynh'];
                const parentEmail: string = row['Email phụ huynh'];
                const parentPhone = row['Số điện thoại'];
                if (!studentName || !studentEmail || !dateOfBirth || !className || !gender || !parentName || !parentEmail || !parentPhone) {
                    // throw new BadRequestException(`Trong file excel không được bỏ trống trường tại hàng ${index + 2}`);
                    throw new NotFoundException(`Trong file excel không được bỏ trống trường tại hàng ${index + 2}`);
                }
                // Check email học sinh đã tồn tại chưa
                const existingAccount = await this.prisma.account.findUnique({ where: { email: studentEmail } });
                if (existingAccount) {
                    throw errorResponse(400, `Email ${studentEmail} của học sinh tại hàng ${index + 2} đã tồn tại trong hệ thống`);
                }
            }
            // End Check file excel có bị trống chỗ nào không 

            // Bắt đầu xử lý
            for (const [index, row] of (clearData as any[]).entries()) {
                // const { fullName, dateOfBirth, class: className, email } = row;
                const studentName = row['Tên học sinh'];
                const studentEmail = row['Email'];
                const dateOfBirth = row['Ngày sinh'];
                const className = row['Lớp'];
                const gender = row['Giới tính'];

                const parentName = row['Tên phụ huynh'];
                const parentEmail: string = row['Email phụ huynh'];
                const parentPhone = row['Số điện thoại'];
                // End Check file excel có bị trống chỗ nào không 

                // Lưu thông tin parent tạm vào bảng parentInfo 
                /* Bước 1 - Kiểm tra đã có thông tin parent tạm này chưa vì có thể 1 cha mẹ có nhiều học sinh */
                const parentInfoExist = await this.prisma.parentInfo.findUnique({
                    where: { email: parentEmail }
                })
                let parentInfoID: number;
                if (!parentInfoExist) {
                    try {
                        const parentInfo = await this.prisma.parentInfo.create({
                            data: {
                                fullname: parentName,
                                email: parentEmail,
                                phone: parentPhone
                            }
                        })
                        parentInfoID = parentInfo.id
                        try {
                            await this.mailService.sendParentRegistrationMail(parentEmail, parentName, studentName, 'http://localhost:5173/');
                            console.log(`Gửi mail thành công tới ${parentEmail}`);
                        } catch (error) {
                            console.error(`Gửi mail tới ${parentEmail} thất bại:`, error);
                        }
                    } catch (error) {
                        console.log(error)
                        throw new BadRequestException(error)
                    }
                } else {
                    parentInfoID = parentInfoExist.id
                }


                // Kiểm tra xem email của học sinh đã tồn tại trong hệ thống chưa 
                const existingAccount = await this.prisma.account.findUnique({
                    where: { email: studentEmail },
                });
                if (existingAccount) {
                    throw errorResponse(400, `Email ${studentEmail} của học sinh  tại hàng  ${index + 2} đã tồn tại trong hệ thống`)
                }
                // End  Kiểm tra xem email của học sinh đã tồn tại trong hệ thống chưa 

                const hashedPassword = await hash(rawPassword, 10);

                // Tạo account Student 
                const account = await this.prisma.account.create({
                    data: {
                        fullname: studentName,
                        email: studentEmail,
                        password: hashedPassword,
                        roleID: 5,
                        createdBy: reqUser.id
                    }
                })
                if (!account) {
                    throw errorResponse(400, `Tạo tài khoản cho học sinh có email ${studentEmail} tại hàng ${index + 2} bị lỗi`)
                }
                // Tạo bảng ghi Student 
                const student_code = await generateStudentCode(this.prisma);
                const student = await this.prisma.student.create({
                    data: {
                        accountID: account.id,
                        student_code,
                        parentInfoID: parentInfoID,
                        dateOfBirth,
                        class: className,
                        gender,
                        createdBy: reqUser.id
                    }
                })
                try {
                    await this.mailService.sendStudentAccountMail(studentEmail, studentName, rawPassword);
                    console.log(`Gửi mail thành công tới ${studentEmail}`);
                } catch (error) {
                    console.error(`Gửi mail tới ${studentEmail} thất bại:`, error);
                    throw new BadRequestException(error)
                }

                results.push({ username: studentEmail, password: rawPassword });
            }
            return successResponse(200, results, 'Import file excel thành công')
        } catch (error) {
            throw error;
            // throw new BadRequestException()
        }
    }
}


function excelDateToJSDate(serial: number): Date {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;

    let total_seconds = Math.floor(86400 * fractional_day);

    const seconds = total_seconds % 60;
    total_seconds -= seconds;

    const hours = Math.floor(total_seconds / 3600);
    const minutes = Math.floor((total_seconds % 3600) / 60);

    date_info.setHours(hours);
    date_info.setMinutes(minutes);
    date_info.setSeconds(seconds);

    return date_info;
}


function cleanAndFormatExcelData(rawData: any[]): any[] {
    return rawData.map(row => {
        const newRow: any = {};
        Object.keys(row).forEach(key => {
            const trimmedKey = key.trim();
            newRow[trimmedKey] = row[key];
        });
        if (typeof newRow['Ngày sinh'] === 'number') {
            newRow['Ngày sinh'] = excelDateToJSDate(newRow['Ngày sinh']);
        }
        return newRow;
    });
}

