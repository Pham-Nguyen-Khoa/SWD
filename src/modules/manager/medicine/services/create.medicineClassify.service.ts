import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";
import { CreateMedicineClassifyDTO } from "../dtos/create.medicineClassify.manager.dto";


@Injectable()
export class CreateMedicineClassifyManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(data: CreateMedicineClassifyDTO, reqUser) {
        // Check danh mục thuốc đã tồn tại chưa
        const checkMedicineClassify = await this.prisma.medicineClassify.findFirst({
            where: {
                name: data.name
            }
        })
        if (checkMedicineClassify) {
            return errorResponse(400, `Danh mục thuốc ${data.name} đã tồn tại`)
        }


        const newMedicineClasify = await this.prisma.medicineClassify.create({
            data: {
                ...data,
                createdBy: reqUser.id
            }
        })
        return successResponse(200, newMedicineClasify, 'Tạo danh mục thuốc mới thành công')
    }
}