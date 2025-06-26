import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { DateHelper } from "src/helpers/date.helper";
import { errorResponse, successResponse } from "src/common/utils/response.util";

enum CheckUpTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS'
}

@Injectable()
export class GetDetailCheckUpNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetail(id: number) {
        const healthCheckUpEvent = await this.prisma.healthCheckup.findUnique({
            where: { id },
            include: {
                HealthCheckupTarget: true,
                HealthCheckupContent: true,
            }
        });

        if (!healthCheckUpEvent) {
            return errorResponse(400, 'Không tìm thấy cuộc tiêm chủng có id này');
        }

        const targetType = healthCheckUpEvent.HealthCheckupTarget[0]?.targetType ?? 'UNKNOWN';
        let formattedTargets: any[] = [];

        if (targetType === 'CLASS') {
            const classIDs = healthCheckUpEvent.HealthCheckupTarget.map(t => t.targetID);

            const classes = await this.prisma.class.findMany({
                where: {
                    id: { in: classIDs }
                },
                select: { id: true, name: true, grade: true }
            });

            formattedTargets = classes.map(cls => ({
                classID: cls.id,
                className: cls.name,
                grade: cls.grade
            }));
        } else if (targetType === 'GRADE') {
            formattedTargets = healthCheckUpEvent.HealthCheckupTarget.map(t => ({
                grade: t.targetID
            }));
        } else if (targetType === 'SCHOOL') {
            formattedTargets = []; // FE chỉ cần biết là SCHOOL, không cần danh sách
        }
        const lastAcamedicYear = await this.prisma.academicYear.findFirst({
            orderBy: {
                startDate: "desc"
            }
        })

        const studentResponseEntity = await this.prisma.healthCheckupResponse.findMany({
            where: {
                healthCheckUpID: id
            },
            select: {
                status: true,
                note: true,
                student: {
                    select: {
                        id: true,
                        ParentInfo: true,
                        account: {
                            select: {
                                fullname: true,
                                email: true
                            }
                        },
                        classAssignments: {
                            where: { academicYearID: lastAcamedicYear?.id },
                            select: {
                                class: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        const totalStudent = studentResponseEntity.length;
        const studentsAcceptCount = studentResponseEntity.filter(student => student.status === "ACCEPTED").length;
        const studentsDeclinedCount = studentResponseEntity.filter(student => student.status === "DECLINED").length;
        const studentPendingCount = totalStudent - studentsAcceptCount - studentsDeclinedCount;
        const studentResponseCount = {
            totalStudent,
            studentsAcceptCount,
            studentsDeclinedCount,
            studentPendingCount
        }
        const result = {
            id: healthCheckUpEvent.id,
            title: healthCheckUpEvent.title,
            description: healthCheckUpEvent.description,
            scheduledAt: healthCheckUpEvent.scheduledAt,
            status: healthCheckUpEvent.status,
            createdAt: healthCheckUpEvent.createdAt,
            targetType,
            targets: formattedTargets,
            content: healthCheckUpEvent.HealthCheckupContent,
            studentResponseEntity,
            studentResponseCount
        }
        return successResponse(200, result, 'Lấy thông tin chi tiết khám định kỳ thành công');
    }

}