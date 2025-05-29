import { Injectable } from "@nestjs/common";
import { VaccinationTarget } from "@prisma/client";
import { errorResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class ConfrimVaccinationEventManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async confirm(vaccinationEventID: number) {
        console.log(vaccinationEventID)
        const vaccinationEventEntity = await this.prisma.vaccinationEvent.findUnique({
            where: {
                id: vaccinationEventID
            },
            include: {
                targets: true,
            }
        })
        if (!vaccinationEventEntity) {
            return errorResponse(400, `Không tìm thấy cuộc tiêm chủng nào có ID ${vaccinationEventID}`)
        }
        if (vaccinationEventEntity.status === "CONFIRMED") {
            return errorResponse(400, 'Cuộc tiêm chủng này đã được xác nhận và gửi thông báo đến phụ huynh học sinh')
        }
        const studentsID = await this.getTargetedStudentIDs(vaccinationEventID, vaccinationEventEntity.targets);
        console.log(studentsID)
        const parentsEntity = await this.prisma.student.findMany({
            where: {
                id: { in: studentsID }

            },
            select: {
                parentInfoID: true
            }
        })
        const uniqueParentIDs = [...new Set(parentsEntity.map((s) => s.parentInfoID))];
        return {
            studentsID,
            uniqueParentIDs
        }
    }
    private async getTargetedStudentIDs(vaccinationEventID: number, targets: VaccinationTarget[]) {
        const academicYear = await this.prisma.academicYear.findFirst({
            orderBy: { startDate: 'desc' }
        })
        if (!academicYear) return [];

        const whereClause: any = {
            academicYearID: academicYear.id,
        };
        const classTargetIDs = targets.filter(t => t.targetType === 'CLASS').map(t => t.targetID);
        const gradeTargetIDs = targets.filter(t => t.targetType === "GRADE").map(t => t.targetID);
        const isSchoolTargeted = targets.some(t => t.targetType === 'SCHOOL');
        if (isSchoolTargeted) {
            const allStudents = await this.prisma.studentClassAssignment.findMany({
                where: { academicYearID: academicYear.id },
                select: { studentID: true }
            });
            return allStudents.map(s => s.studentID);
        }
        if (classTargetIDs.length > 0) {
            whereClause.classID = { in: classTargetIDs }
        }
        if (gradeTargetIDs.length > 0) {
            whereClause.class = {
                grade: { in: gradeTargetIDs }
            }
        }
        const studentAssignments = await this.prisma.studentClassAssignment.findMany({
            where: whereClause,
            select: { studentID: true }
        })
        return studentAssignments.map(sa => sa.studentID);
    }

}
