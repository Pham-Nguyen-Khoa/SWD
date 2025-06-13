import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class RejectedRequestManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async reject(id: number) {
        const requestEntity = await this.prisma.medicineSupplyRequest.findUnique({
            where: { id }
        })
        if (!requestEntity) {
            return errorResponse(400, 'ID yêu cầu không tồn tại')
        }
        await this.prisma.medicineSupplyRequest.update({
            where: { id },
            data: {
                status: "REJECTED"
            }
        })
        return successResponse(200, 'Từ chối yêu cầu thành công')

    }
}