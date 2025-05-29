import { Injectable } from "@nestjs/common";
import { errorResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllStudentAdminService } from "./getAll-student.admin.service";



@Injectable()
export class GetDetailStudentAdminService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getAllStudentService: GetAllStudentAdminService
    ) { }
    async getDetail(id: number) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            select: {
                id: true,
                student_code: true,
                dateOfBirth: true,
                gender: true,
                graduated: true,
                account: {
                    select: {
                        fullname: true,
                        email: true,
                        roleID: true
                    }
                }
            }
        })
        if (!student) {
            return errorResponse(400, 'Học sinh có id ${id} không tồn tại')
        }
        const studentDetail = await this.getAllStudentService.getAll({ search: student.account.email })
        const data = {
            ...student,
            ParentInfo: studentDetail.result[0].ParentInfo,
            lastAcamedicYear: studentDetail.result[0].lastAcamedicYear,
        }

        return data



    }
}