import { Injectable } from "@nestjs/common";
import { GetAllUserQuery } from "../dto/get.all.users.query.dto";
import { contains } from "class-validator";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class GetAllUserAdminService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getAll(query: GetAllUserQuery) {
        try {
            const {
                search,
                roleID,
                page = 1,
                limit = 10,
                sortBy = 'createdAt',
                order = 'desc'
            } = query
            const whereClause: any = {}
            if (search) {
                whereClause.OR = [
                    { fullname: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } }
                ]
            }
            if (roleID) {
                whereClause.roleID = roleID
            }
            const skip = (page - 1) * limit;

            const [data, total] = await Promise.all([
                this.prisma.account.findMany({
                    where: whereClause,
                    skip,
                    take: limit,
                    orderBy: {
                        [sortBy]: order
                    }
                }),
                this.prisma.account.count({
                    where: whereClause
                })
            ])
            return successResponse(200, {
                data,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            }, 'Lấy danh sách user thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy danh sách user thất bại')

        }
    }
}