import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { UpdateQuantityMedicineDto } from "../dtos/update-quantity.nurse.dto";


@Injectable()
export class UpdateQuantityMedicineNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async update(id: number, data: UpdateQuantityMedicineDto) {
        // check id tồn tại 
        const medicineRequestItemEntity = await this.prisma.medicineRequestItem.findUnique({
            where: { id }
        })
        if (!medicineRequestItemEntity) {
            return errorResponse(400, 'ID không tồn tại')
        }
        await this.prisma.medicineRequestItem.update({
            where: { id },
            data: {
                quantitySent: {
                    increment: parseInt(data.quantityToAdd)
                },
                quantityRemaining: {
                    increment: parseInt(data.quantityToAdd)
                },
                isLowStockNotified: true
            }
        })
        return successResponse(200, 'Cập nhật thêm thuốc thành công')
    }
}