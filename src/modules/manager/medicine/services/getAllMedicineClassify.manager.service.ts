import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";


@Injectable()
export class GetAllMedicineClassifyManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll() {
        const medicineClassify = await this.prisma.medicineClassify.findMany({
            orderBy: {
                createdAt: "asc"
            },
            select: {
                id: true,
                name: true,
                _count: {
                    select: { medicines: true },
                },
            },
        });
        return successResponse(200, medicineClassify, 'Lấy các danh mục thuốc thành công')
    }
}