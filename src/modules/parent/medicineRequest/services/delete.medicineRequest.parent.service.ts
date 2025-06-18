import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class DeleteMedicineRequestParentService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async delete(id: number) {
        // Check id tồn tại
        const medicineRequest = await this.prisma.medicineRequest.findUnique({
            where: {
                id
            }
        })
        if (!medicineRequest) {
            return errorResponse(400, 'ID đơn thuốc không tồn tại')
        }
        if (medicineRequest.status !== "PENDING") {
            return errorResponse(400, 'Y tá đã xác nhận đơn thuốc bạn không thể hủy. Hãy liên hệ y tá để hủy')
        }
        await this.prisma.$transaction([
            this.prisma.medicineRequestItem.deleteMany({
                where: {
                    requestID: id
                }
            }),
            this.prisma.medicineRequest.delete({
                where: {
                    id
                }
            })
        ])

        return successResponse(200, 'Xóa đơn thuốc thành công')
    }
}