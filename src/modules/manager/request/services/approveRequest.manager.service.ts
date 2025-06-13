import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class ApproveRequestManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async approve(id: number) {
        const requestEntity = await this.prisma.medicineSupplyRequest.findUnique({
            where: { id }
        })
        if (!requestEntity) {
            return errorResponse(400, 'ID yêu cầu không tồn tại')
        }
        await this.prisma.medicineSupplyRequest.update({
            where: { id },
            data: {
                status: "APPROVED"
            }
        })
        return successResponse(200, 'Tiếp nhận yêu cầu thành công')

    }
}