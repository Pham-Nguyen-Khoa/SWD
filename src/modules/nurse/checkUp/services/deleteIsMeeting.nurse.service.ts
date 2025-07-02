import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class DeleteIsMeetingNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async delete(id: number, reqUser) {
        const meetingEntity = await this.prisma.healthCheckupMeetingRequest.findUnique({
            where: {
                id: id
            }
        });
        if (meetingEntity) {
            if (meetingEntity?.status === "PENDING") {
                return errorResponse(400, 'Đã gửi thông báo cho phụ huynh chưa thể xóa')
            } else if (meetingEntity?.status === "DECLINED") {
                await this.prisma.healthCheckupMeetingRequest.delete({
                    where: {
                        id
                    }
                });
            } else if (meetingEntity.status === "ACCEPTED") {
                return errorResponse(400, 'Chưa hoàn tất nên không thể xóa')
            } else if (meetingEntity?.status === "COMPLETED") {
                await this.prisma.healthCheckupMeetingRequest.delete({
                    where: {
                        id
                    }
                })
            }
        }
        return successResponse(200, 'Xóa thành công')

    }
}