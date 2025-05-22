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
                const orConditions: any[] = [
                    { fullname: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { student_code: { equals: search, mode: 'insensitive' } }
                ]
                whereClause.OR = orConditions
            }
            if (roleID) {
                whereClause.roleID = roleID
            }
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
                    }
                }),
                this.prisma.account.count({
                    where: whereClause
                })
            ])

            // Lấy danh sách account có roleID = 5 (học sinh)
            const studentAccountIds = accounts.filter(acc => acc.roleID === 5).map(acc => acc.id);
            console.log(studentAccountIds)
            let studentDetails: any[] = [];
            if (studentAccountIds.length > 0) {
                studentDetails = await this.prisma.student.findMany({
                    where: {
                        accountID: {
                            in: studentAccountIds
                        }
                    },
                    select: {
                        accountID: true,
                        student_code: true,
                        class: true,
                        gender: true,
                        ParentInfo: {
                            select: {
                                id: true,
                                fullname: true,
                                phone: true,
                            }
                        }
                    }
                });
            }
            console.log(studentDetails)
            // Ghép thông tin student vào accounts
            const data = accounts.map(acc => {
                if (acc.roleID === 5) {
                    const studentInfo = studentDetails.find(stu => stu.accountID === acc.id);
                    return { ...acc, studentInfo };
                }
                return acc;
            });
            console.log(data)


            return {
                success: true,
                statusCode: 200,
                message: "Lấy danh sách user thành công",
                data,
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