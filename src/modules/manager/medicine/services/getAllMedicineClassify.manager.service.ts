import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service";
import { GetAllMedicineClassifyrQuery } from "../dtos/getAll.medicineClassify.query";


@Injectable()
export class GetAllMedicineClassifyManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll(query: GetAllMedicineClassifyrQuery) {
        const {
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = query
        const skip = (page - 1) * limit;
        let whereClause: any = {}
        if (search) {
            // whereClause.name = { contains: search, mode: 'insensitive' }
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                {
                    medicines: {
                        some: {
                            name: { contains: search, mode: 'insensitive' }
                        }
                    }
                }
            ]
        }
        const [medicineClassify, total] = await Promise.all([
            this.prisma.medicineClassify.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: order
                },
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: { medicines: true },
                    },
                },
            }),
            this.prisma.medicineClassify.count({
                where: whereClause
            })
        ])
        const result = {
            medicineClassify,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
        return successResponse(200, result, 'Lấy các danh mục thuốc thành công')
    }
}