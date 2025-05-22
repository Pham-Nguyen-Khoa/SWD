import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStudentDto } from "../dto/create-student.admin.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { hash } from "bcrypt"
import { DateHelper } from "src/helpers/date.helper";
import { MailService } from "src/modules/common/mail/mail.service";
import { generateStudentCode } from "src/helpers/studentCode";

const rawPassword = "123456";

@Injectable()
export class CreateStudentAdminService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService
    ) { }

    async create(data: CreateStudentDto, reqUser) {
        try {
            // Kiểm tra phụ huynh này đã tồn tại chưa
            const { fullname, email, gender, className, dateOfBirth, parentEmail, parentName, parentPhone } = data
            const parentInfo = await this.prisma.parentInfo.findUnique({
                where: {
                    email: parentEmail
                }
            })
            let parentInfoID: number;
            if (!parentInfo) {
                const newParentInfo = await this.prisma.parentInfo.create({
                    data: {
                        fullname: parentName,
                        email: parentEmail,
                        phone: parentPhone,
                        createdBy: reqUser.id
                    }
                })
                parentInfoID = newParentInfo.id
                try {
                    await this.mailService.sendParentRegistrationMail(parentEmail, parentName, fullname, 'http://localhost:5173/');
                    console.log(`Gửi mail thành công tới ${parentEmail}`);
                } catch (error) {
                    console.error(`Gửi mail tới ${parentEmail} thất bại:`, error);
                }
            } else {
                parentInfoID = parentInfo.id

            }
            // Kiểm tra học sinh đã tồn tại chưa 
            const studentExist = await this.prisma.account.findUnique({
                where: {
                    email: email
                }
            })
            if (studentExist) {
                throw errorResponse(400, `Học sinh ${studentExist.fullname} đã có tài khoản`)
            }
            const hashedPassword = await hash(rawPassword, 10)
            const account = await this.prisma.account.create({
                data: {
                    fullname: fullname,
                    email: email,
                    password: hashedPassword,
                    roleID: 5,
                    createdBy: reqUser.id
                }
            })
            const student_code = await generateStudentCode(this.prisma);
            const newStudent = await this.prisma.student.create({
                data: {
                    dateOfBirth: DateHelper.parseDateStringToDate(dateOfBirth),
                    class: className,
                    gender,
                    accountID: account.id,
                    parentInfoID: parentInfoID,
                    createdBy: reqUser.id,
                    student_code
                }
            })
            try {
                await this.mailService.sendStudentAccountMail(email, fullname, rawPassword);
                console.log(`Gửi mail thành công tới ${email}`);
            } catch (error) {
                console.error(`Gửi mail tới ${email} thất bại:`, error);
                throw new BadRequestException(error)
            }

            return successResponse(200, data, 'Tạo tài khoản học sinh thành công')
        } catch (error) {
            console.log(error)
            throw error
        }
    }


}