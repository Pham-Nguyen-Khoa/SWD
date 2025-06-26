import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class SuccessCheckUpManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async success(id: number, reqUser) {
        const checkUpEvent = await this.prisma.healthCheckup.findUnique({ where: { id } })
        console.log(checkUpEvent)
        if (!checkUpEvent) {
            return errorResponse(400, 'Không tìm thấy cuộc khám sức khỏe định kỳ nào có id này')
        }
        // const now = new Date()
        // if (now < vaccinationEvent.scheduledAt) {
        //     return errorResponse(400, 'Chưa đến lịch diễn ra cuộc tiêm chủng')
        // }
        const checkUpResult = await this.prisma.healthCheckupResult.findFirst({
            where: {
                healthCheckUpID: id
            }
        })
        if (!checkUpResult) {
            return errorResponse(400, 'Cuộc khám sức khỏe định kỳ kết quả chưa hoàn tất nên không thể kết thúc')
        }
        await this.prisma.healthCheckup.update({
            where: { id },
            data: {
                status: "SUCCESSED",
                updatedBy: reqUser.id
            }
        })
        return successResponse(200, `Cuộc khám sức khỏe định kỳ hoàn tất`)
    }
}