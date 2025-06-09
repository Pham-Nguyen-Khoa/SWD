import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class DeleteMedicineManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async delete(id: number) {
        // kiểm tra thuốc có tồn tại ko 
        const medicineEntity = await this.prisma.medicine.findUnique({
            where: { id }
        })
        if (!medicineEntity) {
            return errorResponse(400, 'ID thuốc không tồn tại trong hệ thống')
        }
        await this.prisma.medicine.delete({
            where: { id }
        })
        return successResponse(200, 'Xóa thuốc thành công')
    }
}