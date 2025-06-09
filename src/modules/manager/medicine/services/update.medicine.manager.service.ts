import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";

@Injectable()
export class UpdateMedicineManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly upload: UploadService
    ) { }

    async update(data, reqUser, id: number) {
        // Check thuốc tồn tại
        const existingMedicine = await this.prisma.medicine.findUnique({
            where: { id }
        });

        if (!existingMedicine) {
            return errorResponse(400, 'ID thuốc không tồn tại');
        }

        // Check tên thuốc đã tồn tại chưa
        if (data.name) {
            const checkName = await this.prisma.medicine.findFirst({
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
                return errorResponse(400, 'Tên thuốc đã được sử dụng cho thuốc khác', "MEDICINE_EXIST");
            }
        }

        let imageUrl = existingMedicine.image;
        if (data.image) {
            try {
                imageUrl = await this.upload.uploadImage(data.image);
            } catch (error) {
                return errorResponse(500, 'Upload hình ảnh thất bại', "UPLOAD_FAIL");
            }
        }

        let classifyID = data.classifyID ?? existingMedicine.classifyID;

        // Nếu chọn loại "other" thì xử lý thêm loại thuốc mới
        if (classifyID === "other" && classifyID) {
            const newClassifyName = data.newClassifyName?.trim();

            if (!newClassifyName) {
                return errorResponse(400, 'Vui lòng nhập tên danh mục thuốc mới');
            }

            const existingClassify = await this.prisma.medicineClassify.findFirst({
                where: {
                    name: {
                        equals: newClassifyName.trim(),
                        mode: 'insensitive'
                    }
                }
            });

            if (existingClassify) {
                return errorResponse(400, `Danh mục thuốc "${newClassifyName}" đã tồn tại`);
            }

            const newClassify = await this.prisma.medicineClassify.create({
                data: {
                    name: newClassifyName,
                    createdBy: reqUser.id
                }
            });

            classifyID = newClassify.id;
        } else {
            // Nếu không phải "other", validate ID danh mục có tồn tại không
            if (data.classifyID) {
                const classifyExists = await this.prisma.medicineClassify.findUnique({
                    where: { id: parseInt(classifyID) }
                });

                if (!classifyExists) {
                    return errorResponse(400, 'Danh mục thuốc không tồn tại');
                }
            }
        }

        let stockValue = existingMedicine.stock;

        if (data.stock !== undefined) {
            const parsedStock = parseInt(data.stock);
            if (isNaN(parsedStock)) {
                return errorResponse(400, 'Giá trị stock phải là một số hợp lệ');
            }
            stockValue = parsedStock;
        }

        const updateData = {
            name: data.name ?? existingMedicine.name,
            stock: stockValue,
            type: data.type ?? existingMedicine.type,
            usage: data.usage ?? existingMedicine.usage,
            description: data.description ?? existingMedicine.description,
            classifyID: parseInt(classifyID),
            image: imageUrl,
            updatedBy: reqUser.id,
        };
        try {
            const medicine = await this.prisma.medicine.update({
                where: {
                    id: id
                },
                data: updateData
            });

            return successResponse(200, medicine, 'Cập nhật thuốc thành công');
        } catch (error) {
            console.log(error)
            return errorResponse(500, 'Lỗi tạo thuốc mới');
        }



    }
}
