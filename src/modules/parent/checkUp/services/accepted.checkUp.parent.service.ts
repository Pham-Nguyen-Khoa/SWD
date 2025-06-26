import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class AcceptedCheckUpParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async accepted(id: number, studentID: number, reqUser) {
        const parentID = await this.prisma.parent.findUnique({ where: { accountID: reqUser.id } })
        const response = await this.prisma.healthCheckupResponse.findFirst({
            where: { healthCheckUpID: id, studentID }, include: {
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
                status: "ACCEPTED",
                respondedAt: new Date(),
            }
        })
        return successResponse(200, 'Đã ghi nhận phản hồi ')


    }
}