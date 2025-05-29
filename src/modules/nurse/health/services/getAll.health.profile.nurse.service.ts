import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllHealthProfileQuery } from "../dto/getAll.health.profile.query.dto";



@Injectable()
export class GetAllHealthProfileNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll(query: GetAllHealthProfileQuery) {
        const { search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = query;
        const skip = (page - 1) * limit;
        const whereClause: any = {}
        if (search) {
            whereClause.OR = [
                { student: { student_code: { contains: search, mode: 'insensitive' } } },
                {
                    student: {
                        account: {
                            OR: [
                                { fullname: { contains: search, mode: 'insensitive' } },
                                { email: { contains: search, mode: 'insensitive' } },
                            ],
                        },
                    },
                },
            ];
        }
        // Tìm theo lớp
        const [healthProfiles, total] = await Promise.all([
            this.prisma.healthProfile.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: order
                },

                select: {
                    id: true,
                    student: {
                        select: {
                            id: true,
                            student_code: true,
                            dateOfBirth: true,
                            gender: true,
                            ParentInfo: {
                                select: {
                                    fullname: true,
                                    email: true,
                                    phone: true
                                }
                            },
                            account: {
                                select: {
                                    fullname: true,
                                    email: true,
                                }
                            },
                            classAssignments: {
                                select: {
                                    class: {
                                        select: {
                                            name: true
                                        }
                                    },
                                }
                            }
                        }
                    },
                }
            }),
            this.prisma.healthProfile.count({
                where: whereClause
            })
        ])
        const studentNotHaveHealthProfile = await this.prisma.student.findMany({
            where: {
                healthProfile: null
            }
        })
        const totalHealthProfileSchool = await this.prisma.healthProfile.count({})
        const result = {
            totalHealthProfileSchool,
            studentNotHaveHealthProfile: studentNotHaveHealthProfile.length,
            listHealthProfiles: healthProfiles
        }

        return {
            success: true,
            statusCode: 200,
            message: "Lấy danh sách hồ sơ y tế học sinh thành công",
            result,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }
        return result
    }
}