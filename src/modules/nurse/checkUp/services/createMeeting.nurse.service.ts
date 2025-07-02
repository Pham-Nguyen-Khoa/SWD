import { ParentInfo } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { HealthCheckupMeetingRequestDto } from "../dtos/createMeetingCheckUp.nurse.dto";
import { MailService } from "src/modules/common/mail/mail.service";

@Injectable()
export class CreateIsMeetingNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailService
    ) { }
    async create(data: HealthCheckupMeetingRequestDto, reqUser) {
        const [healthCheckUpEntity, studentEntity] = await Promise.all([
            this.prisma.healthCheckup.findUnique({
                where: {
                    id: data.healthCheckUpID
                }
            }),
            this.prisma.student.findUnique({
                where: { id: data.studentID }
            })
        ])
        if (!healthCheckUpEntity || !studentEntity) {
            return errorResponse(400, 'Không tìm thấy thông tin')
        }

        const checkExist = await this.prisma.healthCheckupMeetingRequest.findFirst({
            where: {
                healthCheckUpID: data.healthCheckUpID,
                studentID: data.studentID
            }
        })
        if (checkExist) {
            return errorResponse(400, 'Đã có lịch hẹn với phụ huynh học sinh này');
        }

        const isConflict = await this.prisma.healthCheckupMeetingRequest.findFirst({
            where: {
                scheduledAt: new Date(data.scheduledAt),
            },
        });

        if (isConflict) {
            return errorResponse(400, 'Khung giờ này đã có người đặt, vui lòng chọn khung giờ khác.');
        }
        await this.prisma.healthCheckupMeetingRequest.create({
            data: {
                healthCheckUpID: data.healthCheckUpID,
                studentID: data.studentID,
                scheduledAt: new Date(data.scheduledAt),
                reason: data.reason,
                createdBy: reqUser.id
            }
        })
        const student = await this.prisma.student.findFirst({
            where: {
                id: data.studentID,
            },
            include: {
                account: true,
                ParentInfo: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        if (!student) return
        await this.prisma.healthCheckupResult.update({
            where: {
                healthCheckUpID_studentID: {
                    healthCheckUpID: data.healthCheckUpID,
                    studentID: data.studentID
                }
            },
            data: {
                isMeeting: false
            }
        })
        this.mailer.healthCheckupMeetingNotification(data.scheduledAt, student?.ParentInfo.email, student?.ParentInfo.fullname, student?.account.fullname, data.reason)
        return successResponse(200, 'Gửi thông báo đến phụ huynh thành công')
    }
}