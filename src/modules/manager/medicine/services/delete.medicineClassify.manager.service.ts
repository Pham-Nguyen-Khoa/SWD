import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class DeleteMedicineClassifyManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async delete(id: number) {
        // kiểm tra danh mục có tồn tại ko 
        const checkMedicineClassify = await this.prisma.medicineClassify.findUnique({
            where: { id }
        })
        if (!checkMedicineClassify) {
            return errorResponse(400, 'ID danh mục thuốc không tồn tại trong hệ thống')
        }

        Promise.all([
            // Xóa tất cả thuốc thuộc danh mục này 
            await this.prisma.medicine.deleteMany({
                where: { classifyID: id }
            }),
            // Xóa danh mục thuốc
            await this.prisma.medicineClassify.delete({
                where: { id }
            })
        ])
        return successResponse(200, `Xóa danh mục thuốc ${checkMedicineClassify.name} thành công `)
    }
}