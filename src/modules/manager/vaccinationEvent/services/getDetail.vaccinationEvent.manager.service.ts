import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { DateHelper } from "src/helpers/date.helper";
import { errorResponse, successResponse } from "src/common/utils/response.util";

enum VaccinationTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS'
}

@Injectable()
export class GetDetailVaccinationEventManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetail(id: number) {
        const vaccinationEvent = await this.prisma.vaccinationEvent.findUnique({
            where: { id },
            include: {
                targets: true
            }
        });

        if (!vaccinationEvent) {
            return errorResponse(400, 'Không tìm thấy cuộc tiêm chủng có id này');
        }

        const targetType = vaccinationEvent.targets[0]?.targetType ?? 'UNKNOWN';
        let formattedTargets: any[] = [];

        if (targetType === 'CLASS') {
            const classIDs = vaccinationEvent.targets.map(t => t.targetID);

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
            formattedTargets = vaccinationEvent.targets.map(t => ({
                grade: t.targetID
            }));
        } else if (targetType === 'SCHOOL') {
            formattedTargets = []; // FE chỉ cần biết là SCHOOL, không cần danh sách
        }

        return {
            id: vaccinationEvent.id,
            name: vaccinationEvent.name,
            description: vaccinationEvent.description,
            scheduledAt: vaccinationEvent.scheduledAt,
            status: vaccinationEvent.status,
            createdAt: vaccinationEvent.createdAt,
            targetType,
            targets: formattedTargets
        };
    }

}