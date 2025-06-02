import { Injectable } from "@nestjs/common";
import { DeclinedVaccinationEventParentDto } from "../dtos/declinedVaccinationEvent.parent.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";




@Injectable()
export class DeclinedVaccinationEventParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async declined(id: number, data: DeclinedVaccinationEventParentDto, reqUser) {

        try {
            const parentID = await this.prisma.parent.findUnique({ where: { accountID: reqUser.id } })
            const response = await this.prisma.vaccinationResponse.findUnique({
                where: { id }, include: {
                    student: {
                        select: {
                            parentId: true
                        }
                    }
                }
            });
            if (!response) {
                return errorResponse(400, 'Không tìm thấy thông báo tiêm chủng nào có id này ')
            }
            if (response.student.parentId !== parentID?.id) {
                return errorResponse(400, 'Bạn không có quyền phản hồi mục này.')
            }
            if (response.status !== 'PENDING') {
                return errorResponse(400, 'Phản hồi đã được gửi trước đó.');
            }
            await this.prisma.vaccinationResponse.update({
                where: { id: response.id },
                data: {
                    status: "DECLINED",
                    note: data.note,
                    respondedAt: new Date(),
                }
            })
            return successResponse(200, 'Đã ghi nhận phản hồi ')
        } catch (error) {
            return errorResponse(400, 'Ghi nhận phản hồi thất bại')

        }
    }
}