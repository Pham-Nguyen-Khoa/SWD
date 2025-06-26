import { Injectable } from "@nestjs/common";
import { successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllVaccinationEventNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll() {
        const checkUpEvents: any = await this.prisma.healthCheckup.findMany({
            where: {
                status: {
                    in: ["CONFIRMED", "SUCCESSED"]
                }
            },
            orderBy: {
                scheduledAt: "asc"
            },
            include: {
                HealthCheckupTarget: true
            }
        })
        if (checkUpEvents.length === 0) {
            return successResponse(200, 'Không có sự kiện khám sức khỏe định kỳ nào ')
        }
        for (const target of checkUpEvents) {
            let formattedTargets: any[] = [];
            if (target.HealthCheckupTarget[0].targetType === 'CLASS') {
                const classIDs = target.HealthCheckupTarget.map(t => t.targetID);

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
            } else if (target.HealthCheckupTarget[0].targetType === 'GRADE') {
                formattedTargets = target.HealthCheckupTarget.map(t => ({
                    grade: t.targetID
                }));
            } else if (target.HealthCheckupTarget[0].targetType === 'SCHOOL') {
                formattedTargets = [];
            }
            target.targets = formattedTargets
            const resultResponse = await this.prisma.healthCheckupResponse.findMany({
                where: {
                    healthCheckUpID: target.id
                }
            })
            const totalStudent = resultResponse.length;
            const studentsAcceptCount = resultResponse.filter(student => student.status === "ACCEPTED").length;
            const studentsDeclinedCount = resultResponse.filter(student => student.status === "DECLINED").length;
            const studentPendingCount = totalStudent - studentsAcceptCount - studentsDeclinedCount;
            target.studentResponseCount = {
                totalStudent,
                studentsAcceptCount,
                studentsDeclinedCount,
                studentPendingCount
            }

        }
        const mostRecentCheckUp = {
            id: checkUpEvents[0].id,
            scheduledAt: checkUpEvents[0].scheduledAt,
            title: checkUpEvents[0].title,
            description: checkUpEvents[0].description,
        }
        const result = {
            mostRecentCheckUp,
            checkUpEvents,
        }
        return successResponse(200, result, 'Lấy Danh sách các cuộc khám sức khỏe định kỳ thành công')
    }
}