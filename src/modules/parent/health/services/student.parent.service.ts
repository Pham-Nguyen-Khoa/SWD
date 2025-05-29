import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";



@Injectable()
export class StudentParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async student(reqUser) {
        try {
            const students = await this.prisma.student.findMany({
                where: {
                    Parent: {
                        accountID: reqUser.id
                    }
                },
                select: {
                    id: true,
                    student_code: true,
                    dateOfBirth: true,
                    gender: true,
                    account: {
                        select: {
                            fullname: true,
                            email: true,
                        }
                    },
                    classAssignments: {
                        select: {
                            class: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            })
            return successResponse(200, students, 'Lấy danh sách con của phụ huynh thành công')

        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy danh sách con của phụ huynh thất bại')
        }

    }
}