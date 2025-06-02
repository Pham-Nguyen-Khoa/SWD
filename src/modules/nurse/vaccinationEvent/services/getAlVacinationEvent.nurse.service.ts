import { Injectable } from "@nestjs/common";
import { errorResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllVaccinationEventNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll() {
        const vaccinationEvents = await this.prisma.vaccinationEvent.findMany({
            where: {
                status: "CONFIRMED"
            },
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
            target.targets = formattedTargets
        }
        const mostRecentVaccination = {
            id: vaccinationEvents[0].id,
            scheduledAt: vaccinationEvents[0].scheduledAt,
            name: vaccinationEvents[0].name,
            description: vaccinationEvents[0].description,
        }
        const result = {
            mostRecentVaccination,
            vaccinationEvents,
        }
        return result
    }
}