import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailMedicineClassifyrQuery } from "../dtos/getDetail.medicineClassify.query";


@Injectable()
export class GetDetailMedicineClassifyManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetail(id: number, query: GetDetailMedicineClassifyrQuery) {
        const {
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = query
        const skip = (page - 1) * limit;
        let whereClause: any = {
            classifyID: id
        }
        if (search) {
            whereClause.name = { contains: search, mode: 'insensitive' }
        }
        // Check danh mục tồn tại
        const medicineClassifyEntity = await this.prisma.medicineClassify.findUnique({
            where: { id },
            select: {
                name: true
            }
        })
        if (!medicineClassifyEntity) {
            return errorResponse(400, 'id danh mục không tồn tại trong hệ thống', "CLASSIFY_NOT_FOUND")
        }
        const [medicinesEntity, total] = await Promise.all([
            this.prisma.medicine.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: order
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    description: true,
                    stock: true,
                    type: true,
                    usage: true,
                }
            }),
            this.prisma.medicine.count({
                where: whereClause
            })
        ])
        const result = {
            medicineClassifyName: medicineClassifyEntity.name,
            medicines: medicinesEntity,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }
        return successResponse(200, result, 'Lấy chi tiết danh mục thuốc thành công')
    }
}