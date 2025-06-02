import { SendMailVaccinationEventDTO } from './../dtos/sendMail.vaccinationEvent.manager.dto';
import { Injectable } from "@nestjs/common";
import { VaccinationTarget } from "@prisma/client";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { MailService } from 'src/modules/common/mail/mail.service';


@Injectable()
export class ConfrimVaccinationEventManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService

    ) { }
    async confirm(vaccinationEventID: number, data: SendMailVaccinationEventDTO) {
        try {
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
            const parentsEntity = await this.prisma.student.findMany({
                where: {
                    id: { in: studentsID }

                },
                select: {
                    parentInfoID: true
                }
            })
            const uniqueParentIDs = [...new Set(parentsEntity.map((s) => s.parentInfoID))];

            const studentInfo = await this.prisma.student.findMany({
                where: {
                    id: { in: studentsID }
                },
                select: {
                    id: true,
                    account: {
                        select: {
                            fullname: true,
                            email: true
                        }
                    }
                }
            })


            const parentInfo = await this.prisma.parentInfo.findMany({
                where: {
                    id: { in: uniqueParentIDs }
                },
                select: {
                    fullname: true,
                    email: true,
                    student: {
                        select: {
                            account: {
                                select: {
                                    fullname: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            })
            const subject = data.customMailTitle || vaccinationEventEntity.name;
            const body = data.customMailBody || vaccinationEventEntity.description;
            const scheduledAt = vaccinationEventEntity.scheduledAt.toLocaleDateString('vi-VN');
            await Promise.all(
                parentInfo
                    .filter(parent => parent.email)
                    .map(parent =>
                        this.mailService.sendVaccinationNoticeMail({
                            to: parent.email!,
                            fullname: parent.student[0]?.account.fullname,
                            role: 'Phụ huynh',
                            scheduledAt,
                            title: subject,
                            body
                        }).catch(err => {
                            console.error(`Gửi mail PH thất bại [${parent.email}]:`, err);
                        })
                    )
            );


            // Gửi mail học sinh
            await Promise.all(
                studentInfo
                    .filter(student => student.account?.email)
                    .map(student =>
                        this.mailService.sendVaccinationNoticeMail({
                            to: student.account.email!,
                            fullname: student.account.fullname,
                            role: 'Học sinh',
                            scheduledAt,
                            title: subject,
                            body
                        }).catch(err => {
                            console.error(`Gửi mail HS thất bại [${student.account.email}]:`, err);
                        })
                    )
            );
            // Update 
            await this.prisma.vaccinationEvent.update({
                where: { id: vaccinationEventID },
                data: {
                    status: "CONFIRMED",
                    customMailBody: data.customMailBody,
                    customMailTitle: data.customMailTitle
                }
            })
            const vaccinationResponseData = studentInfo.map((student) => ({
                vaccinationEventID: vaccinationEventEntity.id,
                studentID: student.id,
            }))
            await this.prisma.vaccinationResponse.createMany({
                data: vaccinationResponseData,
                skipDuplicates: true
            })
            return successResponse(200, 'Phê duyệt thành công và đã gửi mail tới cho phụ huynh và học sinh ')
        } catch (error) {
            return errorResponse(400, 'Phê duyệt thất bại ')

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
