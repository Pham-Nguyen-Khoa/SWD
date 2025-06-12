import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllVaccinationEventManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll() {
        const vaccinationEvents: any = await this.prisma.vaccinationEvent.findMany({
            orderBy: {
                scheduledAt: "asc"
            },
            include: {
                targets: true
            }
        })

        for (const target of vaccinationEvents) {
            let formattedTargets: any[] = [];
            if (target.targets[0].targetType === 'CLASS') {
                const classIDs = target.targets.map(t => t.targetID);

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
            } else if (target.targets[0].targetType === 'GRADE') {
                formattedTargets = target.targets.map(t => ({
                    grade: t.targetID
                }));
            } else if (target.targets[0].targetType === 'SCHOOL') {
                formattedTargets = [];
            }
            target.targets = formattedTargets;
            const resultResponse = await this.prisma.vaccinationResponse.findMany({
                where: {
                    vaccinationEventID: target.id
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
        let mostRecentVaccination: any = {}
        let result: any = {}
        if (vaccinationEvents.length > 0) {
            mostRecentVaccination = {
                id: vaccinationEvents[0].id,
                scheduledAt: vaccinationEvents[0].scheduledAt,
                name: vaccinationEvents[0].name,
                description: vaccinationEvents[0].description,
            }
            result = {
                mostRecentVaccination,
                vaccinationEvents,
            }
        }

        return successResponse(200, result, 'Lấy Danh sách các cuộc tiêm chủng thành công')
    }
}