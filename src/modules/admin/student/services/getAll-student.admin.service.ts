import { Account, AcademicYear } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllStudentQuery } from '../dto/get.all.student.query.dto';
import { errorResponse } from 'src/common/utils/response.util';
import { contains } from 'class-validator';



@Injectable()
export class GetAllStudentAdminService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async getAll(query: GetAllStudentQuery) {
        try {
            const { search,
                grade,
                className,
                graduated = false,
                academicYearName,
                page = 1,
                limit = 10,
                sortBy = 'createdAt',
                order = 'desc'
            } = query;
            const skip = (page - 1) * limit;
            let whereClause: any = { graduated };

            // Filter theo năm học nếu không có thì filter theo năm mới nhất
            if (academicYearName) {
                const academicYearEntity = await this.prisma.academicYear.findUnique({
                    where: { name: academicYearName }
                })
                if (!academicYearEntity) {
                    return errorResponse(200, 'Năm học không tồn tại')
                }
                console.log(academicYearEntity)
                whereClause.classAssignments = {
                    some: {
                        academicYearID: academicYearEntity.id
                    },
                    none: { academicYear: { startDate: { gt: academicYearEntity.startDate } } }
                }
            } else {
                const latestAcademicYear = await this.prisma.academicYear.findFirst({
                    orderBy: { startDate: 'desc' }
                });
                if (latestAcademicYear && !graduated) {
                    whereClause.classAssignments = {
                        some: { academicYearID: latestAcademicYear.id },
                        none: { academicYear: { startDate: { gt: latestAcademicYear.startDate } } }
                    };
                }
            }
            // search 
            if (search) {
                whereClause.OR = [
                    { student_code: { contains: search, mode: 'insensitive' } },
                    {
                        account: {
                            OR: [
                                { fullname: { contains: search, mode: 'insensitive' } },
                                { email: { contains: search, mode: 'insensitive' } },

                            ]
                        }
                    }
                ]
            }

            // Tìm theo khối
            if (grade) {
                whereClause.classAssignments.some.class = {
                    ...(whereClause.classAssignments.some.class || {}),
                    grade: parseInt(grade)
                };
            }

            // Tìm theo lớp
            if (className) {
                whereClause.classAssignments.some.class = {
                    ...(whereClause.classAssignments.some.class || {}),
                    name: className
                };
            }

            const [students, total] = await Promise.all([
                this.prisma.student.findMany({
                    where: whereClause,
                    skip,
                    take: limit,
                    orderBy: {
                        [sortBy]: order
                    },
                    select: {
                        id: true,
                        student_code: true,
                        dateOfBirth: true,
                        gender: true,
                        graduated: true,
                        account: {
                            select: {
                                fullname: true,
                                email: true,
                            }
                        },
                        ParentInfo: {
                            select: {
                                fullname: true,
                                email: true,
                                phone: true
                            }
                        },
                    },
                }),
                this.prisma.student.count({
                    where: whereClause
                })
            ])


            // Lấy thông tin lớp học và năm học hiện tại của học sinh
            const result = await Promise.all(
                students.map(async (student) => {
                    const lastAcamedicYear = await this.prisma.studentClassAssignment.findFirst({
                        where: {
                            studentID: student.id
                        }, orderBy: {
                            createdAt: "desc"
                        },
                        select: {
                            class: {
                                select: { name: true, grade: true }
                            },
                            academicYear: {
                                select: { name: true }
                            }
                        }

                    })
                    return {
                        ...student,
                        lastAcamedicYear
                    }

                }))

            return {
                success: true,
                statusCode: 200,
                message: "Lấy danh sách user thành công",
                result,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            }
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy danh sách học sinh thất bại')

        }

    }
}