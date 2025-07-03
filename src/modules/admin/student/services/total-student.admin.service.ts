import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllStudentAdminService } from "./getAll-student.admin.service";
import { GetTotalStudentQuery } from "../dto/get-total-student.admin.query";



@Injectable()
export class GetTotalStudentAdminService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async getTotal(query: GetTotalStudentQuery) {
        let { targetType, targetIds } = query
        if (targetIds && !Array.isArray(targetIds)) {
            targetIds = [targetIds]
        }
        const lastAcademicYear = await this.prisma.academicYear.findFirst({
            orderBy: {
                createdAt: "desc"
            }
        })
        let totalStudent: any = 0;
        if (targetType === "SCHOOL") {
            totalStudent = await this.prisma.studentClassAssignment.count({
                where: {
                    academicYearID: lastAcademicYear?.id
                }
            })
        } else if (targetType === "GRADE" && targetIds) {
            const targetIdsFormat = this.convertToNumbers(targetIds)
            totalStudent = await this.prisma.student.count({
                where: {
                    classAssignments: {
                        some: {
                            class: {
                                grade: { in: targetIdsFormat }
                            }
                        }
                    }
                }
            })
        } else if (targetType === "CLASS" && targetIds) {
            const targetIdsFormat = this.convertToNumbers(targetIds)
            totalStudent = await this.prisma.student.count({
                where: {
                    classAssignments: {
                        some: {
                            class: {
                                id: { in: targetIdsFormat }
                            }
                        }
                    }
                }
            })

        }
        return successResponse(200, totalStudent, 'Tổng số lượng học sinh')
    }

    convertToNumbers(arr: string[]): number[] {
        return arr.map(item => parseInt(item, 10)).filter(item => !isNaN(item));
    }
}