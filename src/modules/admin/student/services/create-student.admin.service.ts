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

            const { fullname, email, gender, className, dateOfBirth, parentEmail, parentName, parentPhone } = data

            // Kiểm tra học sinh đã tồn tại chưa 
            const studentExist = await this.prisma.account.findUnique({
                where: {
                    email: email
                }
            })
            if (studentExist) {
                throw errorResponse(400, `Học sinh ${studentExist.fullname} đã có tài khoản`)
            }
            const [classEntity, academicYearEntity] = await Promise.all([
                this.prisma.class.findUnique({ where: { name: className } }),
                this.prisma.academicYear.findFirst({
                    orderBy: {
                        createdAt: "desc"
                    },
                }),
            ]);
            if (!classEntity) return errorResponse(200, 'Lớp không tồn tại');
            if (!academicYearEntity) return errorResponse(200, 'Năm học không tồn tại');
            // Kiểm tra phụ huynh này đã tồn tại chưa

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
                this.mailService.sendParentRegistrationMail(parentEmail, parentName, fullname, 'http://localhost:5173/').catch(err => {
                    console.error(`Gửi mail phụ huynh thất bại:`, err);
                });
            } else {
                parentInfoID = parentInfo.id

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
                    gender,
                    accountID: account.id,
                    parentInfoID: parentInfoID,
                    createdBy: reqUser.id,
                    student_code,
                }
            })
            this.mailService.sendStudentAccountMail(email, fullname, rawPassword).catch(err => {
                console.error(`Gửi mail học sinh thất bại:`, err);
            });
            // Tạo phân lớp
            await this.prisma.studentClassAssignment.create({
                data: {
                    studentID: newStudent.id,
                    academicYearID: academicYearEntity.id,
                    classID: classEntity.id,
                },
            });

            return successResponse(200, data, 'Tạo tài khoản học sinh thành công')
        } catch (error) {
            console.log(error)
            throw error
        }
    }


}