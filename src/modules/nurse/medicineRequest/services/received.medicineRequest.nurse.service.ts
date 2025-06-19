import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class RecievedMedicineRequestNurseService {
    constructor(
        private readonly prisma: PrismaService,

    ) { }
    async received(id: number, reqUser) {
        const medicineRequestEntity = await this.prisma.medicineRequest.findUnique({
            where: { id }
        })
        if (!medicineRequestEntity) {
            return errorResponse(400, 'ID Đơn thuốc phụ huynh gửi không tồn tại')
        }
        try {
            await this.prisma.medicineRequest.update({
                where: { id },
                data: {
                    status: "CONFIRMED_RECEIVED",
                    receivedAt: new Date(),
                    updatedBy: reqUser.id
                }
            })
            return successResponse(200, 'Cập nhật nhận thuốc thành công')
        } catch (error) {
            return errorResponse(400, 'Cập nhật nhận thuốc thất bại')
        }
    }
}