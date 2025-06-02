import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetAllVaccinationEventParentService {
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
            const vacccinationReponse = await this.prisma.vaccinationResponse.findMany({
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
                    vaccinationEvent: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            scheduledAt: true
                        }
                    }
                }
            })
            const pendingResponses = vacccinationReponse.filter(r => r.status === 'PENDING');
            return successResponse(200, pendingResponses, 'Lấy danh sách các thông báo tiêm chủng thành công')
        } catch (error) {
            return errorResponse(400, 'Lấy danh sách thông báo tiêm chủng thất bại')
        }
    }
}