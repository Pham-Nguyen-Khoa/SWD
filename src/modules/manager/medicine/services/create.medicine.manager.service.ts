import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";

@Injectable()
export class CreateMedicineManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly upload: UploadService
    ) { }

    async create(data, reqUser) {
        // Validate: tên thuốc đã tồn tại?
        const existingMedicine = await this.prisma.medicine.findFirst({
            where: { name: data.name.trim() }
        });

        if (existingMedicine) {
            return errorResponse(400, 'Thuốc đã tồn tại');
        }

        let classifyID = data.classifyID;

        // Nếu chọn loại "other" thì xử lý thêm loại thuốc mới
        if (classifyID === "other") {
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
            const classifyExists = await this.prisma.medicineClassify.findUnique({
                where: { id: parseInt(classifyID) }
            });

            if (!classifyExists) {
                return errorResponse(400, 'Danh mục thuốc không tồn tại');
            }
        }

        // Upload hình ảnh
        let imageUrl = '';
        try {
            imageUrl = await this.upload.uploadImage(data.image);
        } catch (error) {
            return errorResponse(500, 'Upload hình ảnh thất bại');
        }

        // Chuẩn bị dữ liệu để tạo thuốc mới
        const createData = {
            name: data.name.trim(),
            stock: parseInt(data.stock),
            description: data.description?.trim() || null,
            type: data.type,
            usage: data.usage?.trim() || null,
            image: imageUrl,
            classifyID: parseInt(classifyID),
            createdBy: reqUser.id
        };

        try {
            const medicine = await this.prisma.medicine.create({
                data: createData
            });

            return successResponse(200, medicine, 'Tạo thuốc mới thành công');
        } catch (error) {
            return errorResponse(500, 'Lỗi tạo thuốc mới');
        }
    }
}
