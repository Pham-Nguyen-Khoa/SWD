import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateMedicalEventNurseDTO } from "../dtos/create.medicalEvent.nurse.dto";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { DateHelper } from "src/helpers/date.helper";


@Injectable()

export class CreateMedicalEventNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailService
    ) { }
    async create(data: CreateMedicalEventNurseDTO, reqUser) {
        const {
            student_code,
            type,
            occurredAt,
            description,
            severity,
            hospitalName,
            transferredAt
        } = data
        //  Kiểm tra học sinh tồn tại 
        const studentEntity = await this.prisma.student.findFirst({
            where: {
                student_code
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
        console.log(studentEntity)
        if (!studentEntity) {
            return errorResponse(400, "Không tìm thấy học sinh có mã số này", 'NOT_FOUND_STUDENT')
        }
        console.log(occurredAt)
        const newMedicalEvent = await this.prisma.medicalEvent.create({
            data: {
                studentID: studentEntity.id,
                type,
                occurredAt: new Date(occurredAt),
                description,
                severity,
                createdBy: reqUser.id
            }
        })
        if (severity === "HOSPITAL") {
            if (!hospitalName || !transferredAt) {
                return errorResponse(400, "Nhập tên bệnh viện và thời gian chuyển")
            }
            // Update medicalEvent status sang nhập viện 
            await this.prisma.medicalEvent.update({
                where: { id: newMedicalEvent.id },
                data: {
                    status: "HOSPITALIZED"
                }
            })
            // Tạo bảng ghi nhập viện
            const newHospital = await this.prisma.hospitalTransfer.create({
                data: {
                    medicalEventID: newMedicalEvent.id,
                    hospitalName,
                    transferredAt: new Date(transferredAt),
                    createdBy: reqUser.id
                }
            })
            const sendData = {
                parentEmail: studentEntity.ParentInfo.email,
                parentName: studentEntity.ParentInfo.fullname,
                studentName: studentEntity.account.fullname,
                description: description,
                hospitalName: hospitalName,
                transferredAt: DateHelper.formatDateToDDMMYYYYHHmm(new Date(transferredAt))
            }
            this.mailer.sendMedicalEventHospital(sendData.parentEmail, sendData.parentName, sendData.studentName, sendData.description, sendData.hospitalName, sendData.transferredAt)
            return successResponse(200, "Tạo sự kiện thành công và đã gửi thông báo đến phụ huynh học sinh")
        }
        return successResponse(200, "Tạo sự kiện thành công ")

    }
}