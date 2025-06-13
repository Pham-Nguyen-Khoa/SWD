import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllMedicineSupplyQuery } from "../dtos/getAll.medicineSuplly.manager.query";


@Injectable()
export class GetAllMedicineSupplyManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll(query: GetAllMedicineSupplyQuery) {
        const {
            search,
            category,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = query
        const skip = (page - 1) * limit;
        let whereClause: any = {}
        if (search) {
            whereClause.name = { contains: search, mode: 'insensitive' }
        }
        if (category) {
            whereClause.category = { contains: category, mode: 'insensitive' }
        }
        const [medicineSupply, total] = await Promise.all([
            this.prisma.medicineSupply.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: order
                },
            }),
            this.prisma.medicineSupply.count({
                where: whereClause
            })
        ])
        const result = {
            medicineSupply,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
        return successResponse(200, result, 'Lấy các danh sách vật tư  thành công')
    }
}