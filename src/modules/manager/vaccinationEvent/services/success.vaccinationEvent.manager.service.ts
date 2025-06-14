import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class SuccessVaccinationEventManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async success(id: number, reqUser) {
        const vaccinationEvent = await this.prisma.vaccinationEvent.findUnique({ where: { id } })
        if (!vaccinationEvent) {
            return errorResponse(400, 'Không tìm thấy cuộc tiêm chủng nào có id này')
        }
        // const now = new Date()
        // if (now < vaccinationEvent.scheduledAt) {
        //     return errorResponse(400, 'Chưa đến lịch diễn ra cuộc tiêm chủng')
        // }
        await this.prisma.vaccinationEvent.update({
            where: { id },
            data: {
                status: "SUCCESSED"
            }
        })
        return successResponse(200, `Cuộc tiêm chủng hoàn tất`)
    }
}