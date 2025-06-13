import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllMedicineSupplyNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll() {
        const medicineSupply = await this.prisma.medicineSupply.findMany(
            {
                select: {
                    id: true,
                    image: true,
                    name: true,
                    description: true,
                    stock: true,
                    usage: true,
                    category: true
                }
            }
        );
        return successResponse(200, medicineSupply, "Lấy ra danh mục thuốc thành công")
    }
}