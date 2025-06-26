import { Injectable } from "@nestjs/common";
import { HealthCheckupTarget, VaccinationTarget } from "@prisma/client";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { MailService } from 'src/modules/common/mail/mail.service';
import { SendMailCheckUpDTO } from "../dtos/sendMail.vaccinationEvent.manager.dto";


@Injectable()
export class ConfirmCheckUpManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService

    ) { }
    async confirm(checkUpID: number, data: SendMailCheckUpDTO) {
        try {
            const checkUpEntity = await this.prisma.healthCheckup.findUnique({
                where: {
                    id: checkUpID
                },
                include: {
                    HealthCheckupTarget: true,
                    HealthCheckupContent: true,
                }
            })
            if (!checkUpEntity) {
                return errorResponse(400, `Không tìm thấy cuộc khám sức khỏe định kỳ nào có ID ${checkUpID}`)
            }
            if (checkUpEntity.status === "CONFIRMED") {
                return errorResponse(400, 'Cuộc khám sức khỏe định này đã được xác nhận và gửi thông báo đến phụ huynh học sinh')
            }
            const studentsID = await this.getTargetedStudentIDs(checkUpID, checkUpEntity.HealthCheckupTarget);
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
            const subject = data.customMailTitle || checkUpEntity.title;
            const body = data.customMailBody || checkUpEntity.description || "";
            const scheduledAt = checkUpEntity.scheduledAt.toLocaleDateString('vi-VN');
            const checkupItems = checkUpEntity.HealthCheckupContent.map(content => content.name)
            await Promise.all(
                parentInfo
                    .filter(parent => parent.email)
                    .map(parent =>
                        this.mailService.sendCheckUpNoticeMail({
                            to: parent.email!,
                            fullname: parent.student[0]?.account.fullname,
                            role: 'Phụ huynh',
                            scheduledAt,
                            title: subject,
                            body,
                            checkupItems
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
                        this.mailService.sendCheckUpNoticeMail({
                            to: student.account.email!,
                            fullname: student.account.fullname,
                            role: 'Học sinh',
                            scheduledAt,
                            title: subject,
                            body,
                            checkupItems
                        }).catch(err => {
                            console.error(`Gửi mail HS thất bại [${student.account.email}]:`, err);
                        })
                    )
            );
            // Update 
            await this.prisma.healthCheckup.update({
                where: { id: checkUpID },
                data: {
                    status: "CONFIRMED",
                    customMailBody: data.customMailBody,
                    customMailTitle: data.customMailTitle
                }
            })
            const healthCheckupResponseData = studentInfo.map((student) => ({
                healthCheckUpID: checkUpEntity.id,
                studentID: student.id,
            }))
            await this.prisma.healthCheckupResponse.createMany({
                data: healthCheckupResponseData,
                skipDuplicates: true
            })
            return successResponse(200, 'Phê duyệt thành công và đã gửi mail tới cho phụ huynh và học sinh ')
        } catch (error) {
            return errorResponse(400, 'Phê duyệt thất bại ')

        }
    }
    private async getTargetedStudentIDs(vaccinationEventID: number, targets: HealthCheckupTarget[]) {
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
