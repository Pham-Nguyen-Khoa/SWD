import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";

@Injectable()
export class DeleteMedicineSupplyManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly upload: UploadService
    ) { }

    async delete(id: number) {
        // Check id tồn tại 
        const medicineSuplly = await this.prisma.medicineSupply.findUnique({ where: { id } });
        if (!medicineSuplly) {
            return errorResponse(400, 'ID vật tư không tồn tại trong hệ thống');
        }
        await this.prisma.medicineSupply.delete({
            where: { id }
        })
        return successResponse(200, 'Xóa vật tư thành công')
    }
}
