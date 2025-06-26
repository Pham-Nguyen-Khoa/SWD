import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { DeclinedCheckUpParentDto } from "../dtos/declined.checkUp.parent.dto";




@Injectable()
export class DeclinedCheckUpParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async declined(id: number, data: DeclinedCheckUpParentDto, studentID: number, reqUser) {
        try {
            const parentID = await this.prisma.parent.findUnique({ where: { accountID: reqUser.id } })
            const response = await this.prisma.healthCheckupResponse.findFirst({
                where: {
                    healthCheckUpID: id, studentID
                }, include: {
                    student: {
                        select: {
                            parentId: true
                        }
                    }
                }
            });
            if (!response) {
                return errorResponse(400, 'Không tìm thấy thông báo khám sức khỏe định kỳ nào có id này ')
            }
            if (response.student.parentId !== parentID?.id) {
                return errorResponse(400, 'Bạn không có quyền phản hồi mục này.')
            }
            if (response.status !== 'PENDING') {
                return errorResponse(400, 'Phản hồi đã được gửi trước đó.');
            }
            await this.prisma.healthCheckupResponse.update({
                where: { id: response.id },
                data: {
                    status: "DECLINED",
                    note: data.note,
                    respondedAt: new Date(),
                }
            })
            return successResponse(200, 'Đã ghi nhận phản hồi ')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Ghi nhận phản hồi thất bại')
        }
    }
}