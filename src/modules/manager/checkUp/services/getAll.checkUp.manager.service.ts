import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { CreateHealthCheckupDTO } from "../dtos/create.checkUp.manager.dto";
import { DateHelper } from "src/helpers/date.helper";

@Injectable()
export class GetAllCheckUpManagerService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async getAll() {
        try {
            const checkUpEntities: any = await this.prisma.healthCheckup.findMany({
                where: {
                    status: {
                        not: 'DELETED',
                    },
                },
                orderBy: {
                    scheduledAt: "asc"
                },
                include: {
                    HealthCheckupTarget: true
                }
            })
            for (const target of checkUpEntities) {
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
                target.HealthCheckupTarget = formattedTargets;
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

            let mostRecentCheckUp: any = {}
            let result: any = {}
            if (checkUpEntities.length > 0) {
                mostRecentCheckUp = {
                    id: checkUpEntities[0].id,
                    title: checkUpEntities[0].title,
                    scheduledAt: checkUpEntities[0].scheduledAt,
                    name: checkUpEntities[0].name,
                    description: checkUpEntities[0].description,
                    HealthCheckupTarget: checkUpEntities[0].HealthCheckupTarget
                }
                result = {
                    mostRecentCheckUp,
                    checkUpEntities,
                }
            }
            return successResponse(200, result, 'Lấy danh sách khám sức khỏe định kỳ thành công')
        } catch (error) {
            console.log(error)
        }
    }

}