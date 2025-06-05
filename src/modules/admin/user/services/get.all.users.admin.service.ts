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

    async getAll(query: GetAllUserQuery, reqUser) {
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
                const orConditions: any[] = [
                    { fullname: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    // { student_code: { equals: search, mode: 'insensitive' } }
                ]
                // orConditions.push({
                //     Student: {
                //         student_code: { equals: search, mode: 'insensitive' }
                //     }
                // });
                whereClause.OR = orConditions
            }
            if (roleID) {
                whereClause.roleID = roleID
            }
            whereClause.id = { not: reqUser.id };
            const skip = (page - 1) * limit;

            const [accounts, total] = await Promise.all([
                this.prisma.account.findMany({
                    where: whereClause,
                    skip,
                    take: limit,
                    orderBy: {
                        [sortBy]: order
                    },
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        roleID: true,
                        status: true
                    },
                }),
                this.prisma.account.count({
                    where: whereClause
                })
            ])
            return {
                success: true,
                statusCode: 200,
                message: "Lấy danh sách user thành công",
                accounts,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            }
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy danh sách user thất bại')

        }
    }
}