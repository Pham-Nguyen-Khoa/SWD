import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { DateHelper } from "src/helpers/date.helper";


@Injectable()

export class SendNotificationMedicalEventNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailService

    ) { }
    async send(id: number) {
        const medicalEvent = await this.prisma.medicalEvent.findUnique({
            where: { id },
            include: {
                HospitalTransfer: true,
                Treatment: {
                    select: {
                        quantity: true,
                        dosage: true,
                        medicine: {
                            select: {
                                name: true,
                                image: true
                            }
                        },
                        medicineSupply: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                },
            }
        })
        if (!medicalEvent) {
            return errorResponse(400, "Không tìm thấy ID của sự kiện y tế")
        }
        // if (medicalEvent.isSend) {
        //     return errorResponse(400, 'Đã gửi thông báo cho phụ huynh rồi')
        // }

        const studentEntity = await this.prisma.student.findUnique({
            where: {
                id: medicalEvent.studentID
            },
            select: {
                id: true,
                account: {
                    select: {
                        id: true,
                        fullname: true
                    }
                },
                ParentInfo: {
                    select: {
                        fullname: true,
                        email: true,
                        phone: true
                    }
                }
            }
        })
        if (!studentEntity) {
            return errorResponse(400, "Không tìm thấy học sinh có mã số này", 'NOT_FOUND_STUDENT')
        }
        if (medicalEvent.severity === "HOSPITAL" && medicalEvent.HospitalTransfer) {
            const sendData = {
                parentEmail: studentEntity.ParentInfo.email,
                parentName: studentEntity.ParentInfo.fullname,
                studentName: studentEntity.account.fullname,
                description: medicalEvent.description,
                hospitalName: medicalEvent.HospitalTransfer?.hospitalName,
                transferredAt: DateHelper.formatDateToDDMMYYYYHHmm(new Date(medicalEvent?.HospitalTransfer?.transferredAt))
            }
            this.mailer.sendMedicalEventHospital(sendData.parentEmail, sendData.parentName, sendData.studentName, sendData.description, sendData.hospitalName, sendData.transferredAt)
        } else {
            const sendData = {
                parentEmail: studentEntity.ParentInfo.email,
                parentName: studentEntity.ParentInfo.fullname,
                studentName: studentEntity.account.fullname,
                description: medicalEvent.description,
                treatment: medicalEvent.Treatment
            }
            this.mailer.sendMedicalEventNormal(sendData.parentEmail, sendData.parentName, sendData.studentName, sendData.description, sendData.treatment)
        }
        await this.prisma.medicalEvent.update({
            where: { id },
            data: {
                isSend: true
            }
        })
        return successResponse(200, 'Gửi thông báo đến phụ huynh học sinh thành công')
    }
}