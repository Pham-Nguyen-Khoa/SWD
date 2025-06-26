import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetAllCheckUpParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll(reqUser) {
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
            const checkUpReponse = await this.prisma.healthCheckupResponse.findMany({
                where: {
                    studentID: { in: studentIDs }
                },
                include: {
                    student: {
                        select: {
                            id: true,
                            student_code: true,
                            account: {
                                select: {
                                    id: true,
                                    fullname: true,
                                }
                            }
                        }
                    },
                    healthCheckup: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            scheduledAt: true
                        }
                    }
                }
            })
            const pendingResponses = checkUpReponse.filter(r => r.status === 'PENDING');
            return successResponse(200, pendingResponses, 'Lấy danh sách các thông báo khám sức khỏe định kỳ thành công')
        } catch (error) {
            return errorResponse(400, 'Lấy danh sách thông báo khám sức khỏe định kỳ thất bại')
        }
    }
}