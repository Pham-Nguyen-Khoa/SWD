import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllMedicinerQuery } from "../dtos/getAllMedicine.nurse.query";
import { contains } from "class-validator";

@Injectable()
export class GetAllMedicineNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll(query: GetAllMedicinerQuery) {
        const {
            search,
            classifyID,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = query
        const skip = (page - 1) * limit;
        let whereClause: any = {}
        if (search) {
            whereClause.name = {
                contains: search, mode: 'insensitive'
            }
        }
        if (classifyID) {
            const checkClassifyID = await this.prisma.medicineClassify.findUnique({
                where: { id: parseInt(classifyID) }
            })
            if (!checkClassifyID) {
                return errorResponse(400, 'ID danh mục không tồn tại', "CLASSIFYID_NOT_FOUND")
            }
            whereClause.classifyID = parseInt(classifyID)
        }
        const [medicines, total] = await Promise.all([
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
                    classify: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }),
            this.prisma.medicine.count({
                where: whereClause
            })
        ])
        const result = {
            medicines,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
        return successResponse(200, result, 'Lấy danh sách thuốc thành công')

    }
}