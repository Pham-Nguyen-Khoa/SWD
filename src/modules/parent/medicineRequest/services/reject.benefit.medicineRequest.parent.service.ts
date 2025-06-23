import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class RejectedMedicineRequestParentService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async rejected(id: number, reqUser) {
        // Check id tồn tại
        const medicineRequest = await this.prisma.medicineRequest.findUnique({
            where: {
                id
            }
        })
        if (!medicineRequest) {
            return errorResponse(400, 'ID đơn thuốc không tồn tại')
        }

        await this.prisma.medicineRequest.update({
            where: { id },
            data: {
                isBenefit: false,
                acceptedBenefit: false,
                updatedBy: reqUser.id
            }
        })
        return successResponse(200, 'Từ chối dừng việc cho uống thuốc thành công')
    }
}