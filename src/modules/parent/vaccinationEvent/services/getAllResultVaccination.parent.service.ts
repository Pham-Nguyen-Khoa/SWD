import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetAllResultVaccinationEventParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAllResult(reqUser) {
        try {
            const parentID = await this.prisma.parent.findUnique({
                where: { accountID: reqUser.id }
            })
            const students = await this.prisma.student.findMany({
                where: {
                    parentId: parentID?.id
                }
            })
            const studentIDs = students.map(s => s.id);
            const vaccinationEventResults = await this.prisma.vaccinationResult.findMany({
                where: {
                    studentID: { in: studentIDs }
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    vaccinationEvent: {
                        select: {
                            name: true,
                            description: true,
                            scheduledAt: true
                        }
                    },
                    student: {
                        select: {
                            student_code: true,
                            gender: true,
                            account: {
                                select: {
                                    fullname: true,
                                }
                            },
                            classAssignments: {
                                select: {
                                    class: {
                                        select: { name: true }
                                    }
                                }
                            }
                        }
                    },
                    status: true,
                    result: true,
                    note: true,
                }
            })


            return successResponse(200, vaccinationEventResults, 'Lấy danh sách các thông báo tiêm chủng thành công')
        } catch (error) {
            return errorResponse(400, 'Lấy danh sách thông báo tiêm chủng thất bại')
        }
    }
}