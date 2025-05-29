import { Injectable } from "@nestjs/common";
import { UpdateStudentDto } from "../dto/update-student.admin.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { hash } from "bcrypt"
import { DateHelper } from "src/helpers/date.helper";




@Injectable()
export class UpdateStudentAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async updateStudent(id: number, data: UpdateStudentDto, reqUser) {
        const hasValidField = Object.values(data).some(value => value !== undefined && value !== null);

        if (!hasValidField) {
            return errorResponse(400, 'Không có trường hợp lệ để cập nhật');
        }
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: {
                account: true, ParentInfo: true,
            }
        })
        if (!student) {
            return errorResponse(400, `Học sinh id ${id} không tồn tại trong hệ thống`);
        }
        // console.log(student?.classAssignments[0])
        const lastAcademicYear = await this.prisma.studentClassAssignment.findFirst({
            where: {
                studentID: student.id
            }
            , orderBy: {
                createdAt: "desc"
            },
            select: {
                class: {
                    select: { name: true, grade: true }
                },
                academicYear: {
                    select: { id: true, name: true }
                }
            }
        })
        if (!lastAcademicYear) {
            return errorResponse(400, 'Không tìm thấy phân lớp hiện tại của học sinh');
        }
        const result = {
            student,
            ...lastAcademicYear
        }




        // if (data.academicYearName || data.className) {
        if (data.className) {
            const updateDate: any = {}
            // if (data.academicYearName) {
            //     const academicYearEntity = await this.prisma.academicYear.findUnique({ // 2
            //         where: { name: data.academicYearName }
            //     })
            //     if (!academicYearEntity) return errorResponse(200, 'Năm học không tồn tại');
            //     updateDate.academicYearID = academicYearEntity.id
            // }
            if (data.className) {
                const classEntity = await this.prisma.class.findUnique({
                    where: { name: data.className }
                })
                if (!classEntity) return errorResponse(200, 'Lớp không tồn tại');
                updateDate.classID = classEntity.id
            }
            await this.prisma.studentClassAssignment.update({
                where: {
                    studentID_academicYearID: {
                        studentID: result.student.id,
                        academicYearID: result.academicYear.id
                    }
                },
                data: updateDate
            })

        }
        const accountUpdateData: any = {
            updatedBy: reqUser.id
        };
        if (data.email && data.email !== student.account.email) {
            const emailExist = await this.prisma.account.findUnique({ where: { email: data.email } });
            if (emailExist) return errorResponse(400, `Email đã tồn tại`);
            accountUpdateData.email = data.email;
        }
        if (data.password) {
            accountUpdateData.password = await hash(data.password, 10);
        }
        if (data.fullname) {
            accountUpdateData.fullname = data.fullname
        }
        // // Dữ liệu cập nhật student
        const studentUpdateData: any = {
            updatedBy: reqUser.id
        };
        if (data.dateOfBirth) studentUpdateData.dateOfBirth = DateHelper.parseDateStringToDate(data.dateOfBirth);
        if (data.gender) studentUpdateData.gender = data.gender;

        const clasOrAcademicYearUpdate: any = {
            updatedBy: reqUser.id
        }



        // // Dữ liệu cập nhật ParentInfo (chung cho tất cả học sinh liên kết)
        const parentInfoUpdateData: any = {};
        if (data.parentName) parentInfoUpdateData.fullname = data.parentName;
        if (data.parentPhone) parentInfoUpdateData.phone = data.parentPhone;
        if (data.parentEmail) parentInfoUpdateData.email = data.parentEmail;

        await this.prisma.$transaction([
            this.prisma.account.update({
                where: { id: student.accountID },
                data: accountUpdateData
            }),
            this.prisma.student.update({
                where: { id },
                data: studentUpdateData
            }),
            this.prisma.parentInfo.update({
                where: { id: student.ParentInfo.id },
                data: parentInfoUpdateData
            }),
        ])
        const updatedStudent = await this.prisma.student.findUnique({
            where: { id },
            include: {
                account: {
                    select: {
                        fullname: true,
                        email: true,
                        roleID: true,
                        updatedBy: true,
                        updatedAt: true
                    }
                }, ParentInfo: {
                    select: {
                        fullname: true,
                        phone: true,
                        email: true
                    }
                }
            }
        });
        const lastAcademicYearUpdate = await this.prisma.studentClassAssignment.findFirst({
            where: {
                studentID: student.id
            }
            , orderBy: {
                createdAt: "desc"
            },
            select: {
                class: {
                    select: { name: true, grade: true }
                },
                academicYear: {
                    select: { id: true, name: true }
                }
            }
        })
        if (!lastAcademicYearUpdate) {
            return errorResponse(400, 'Không tìm thấy phân lớp hiện tại của học sinh');
        }
        const total = {
            ...updatedStudent,
            ...lastAcademicYearUpdate
        }

        // return successResponse(200, updatedStudent, 'Update thông tin học sinh thành công')
        return successResponse(200, total, 'Update thông tin học sinh thành công')
    }

}