import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";

@Injectable()
export class CreateMedicineSupplyManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly upload: UploadService
    ) { }

    async create(data, reqUser) {
        const existingMedicineSupply = await this.prisma.medicineSupply.findFirst({
            where: { name: data.name.trim() }
        });

        if (existingMedicineSupply) {
            return errorResponse(400, 'Vật tư đã tồn tại');
        }
        // Upload hình ảnh
        let imageUrl = '';
        try {
            imageUrl = await this.upload.uploadImage(data.image);
        } catch (error) {
            return errorResponse(500, 'Upload hình ảnh thất bại');
        }

        const createData = {
            name: data.name.trim(),
            stock: parseInt(data.stock),
            description: data.description?.trim() || null,
            usage: data.usage?.trim() || null,
            category: data.category,
            image: imageUrl,
            createdBy: reqUser.id
        };
        try {
            const medicineSupply = await this.prisma.medicineSupply.create({
                data: createData
            });

            return successResponse(200, medicineSupply, 'Tạo vật tư mới thành công');
        } catch (error) {
            return errorResponse(500, 'Lỗi tạo vật tư mới');
        }
    }
}
