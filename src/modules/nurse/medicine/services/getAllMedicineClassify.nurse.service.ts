import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllMedicineClassifyNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll() {
        const medicineClassify = await this.prisma.medicineClassify.findMany();
        return successResponse(200, medicineClassify, "Lấy ra danh mục thuốc thành công")
    }
}