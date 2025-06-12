import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";

@Injectable()
export class UpdateMedicineSupplyManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly upload: UploadService
    ) { }

    async update(data, reqUser, id: number) {
        // Check  vật tư  tồn tại
        const existingMedicineSupply = await this.prisma.medicineSupply.findUnique({
            where: { id }
        });

        if (!existingMedicineSupply) {
            return errorResponse(400, 'ID vật tư không tồn tại');
        }

        // Check tên thuốc đã tồn tại chưa
        if (data.name) {
            const checkName = await this.prisma.medicineSupply.findFirst({
                where: {
                    name: {
                        equals: data.name.trim(),
                        mode: 'insensitive'
                    },
                    NOT: {
                        id: id
                    }
                },
            })

            if (checkName) {
                return errorResponse(400, 'Tên vật tư đã được sử dụng cho thuốc khác', "MEDICINE_SUPPLY_EXIST");
            }
        }

        let imageUrl = existingMedicineSupply.image;
        if (data.image) {
            try {
                imageUrl = await this.upload.uploadImage(data.image);
            } catch (error) {
                return errorResponse(500, 'Upload hình ảnh thất bại', "UPLOAD_FAIL");
            }
        }
        let stock = existingMedicineSupply.stock;
        if (data.stock) {
            stock = parseInt(data.stock)
        }

        const updateData = {
            name: data.name ?? existingMedicineSupply.name,
            stock: stock,
            usage: data.usage ?? existingMedicineSupply.usage,
            description: data.description ?? existingMedicineSupply.description,
            category: data.category || existingMedicineSupply.category,
            image: imageUrl,
            updatedBy: reqUser.id,
        };
        try {
            const medicineSupply = await this.prisma.medicineSupply.update({
                where: {
                    id: id
                },
                data: updateData
            });

            return successResponse(200, medicineSupply, 'Cập nhật vật tư thành công');
        } catch (error) {
            console.log(error)
            return errorResponse(500, 'Lỗi tạo  cập nhật vật tư  mới');
        }



    }
}
