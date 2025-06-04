import { Injectable } from "@nestjs/common";
import { GetDetailResultVaccinationEventNurseService } from "./getDetailResultVaccinationEvent.nurse.service";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { MailService } from "src/modules/common/mail/mail.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import pLimit from "p-limit";


@Injectable()
export class SendNotificationResultVaccinationEventNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailService,
        private readonly getDetailResultVaccinationEventNurseService: GetDetailResultVaccinationEventNurseService,
    ) { }

    async sendNotification(id: number, reqUser) {
        // Check đã gửi thông báo chưa
        const checkSend = await this.prisma.vaccinationResult.findFirst({
            where: {
                vaccinationEventID: id,
                isSend: true
            }
        })
        if (checkSend) {
            return errorResponse(400, 'Cuộc tiêm chủng này đã được gửi thông báo đến phụ huynh trước đó ')
        }
        const vaccinationEvent = await this.prisma.vaccinationEvent.findUnique({
            where: { id },
            select: {
                name: true,
                description: true,
                scheduledAt: true,
            }
        })
        if (!vaccinationEvent) {
            return errorResponse(400, 'Không tìm thấy cuộc tiêm chủng nào có id này')
        }
        const results = (await this.getDetailResultVaccinationEventNurseService.getDetail(id)).data;

        type VaccinationResultFormat = {
            result: {
                status: 'SUCCESS' | 'SKIPPED';
                result: 'GOOD' | 'BAD' | 'NOT_EVALUATED';
                note?: string;
            };
            studentName: string;
            parentName: string;
            parentEmail: string;
        };
        const resultsFormat: VaccinationResultFormat[] = results.map((res) => ({
            result: {
                status: res.status,
                result: res.result,
                note: res.note,
            },
            studentName: res.student.account.fullname,
            parentName: res.student.ParentInfo.fullname,
            parentEmail: res.student.ParentInfo.email,
        }))
        resultsFormat.map((item: VaccinationResultFormat) =>
            this.mailer.sendNotificationResultVaccinationResultParent(
                vaccinationEvent?.name,
                vaccinationEvent?.scheduledAt.toLocaleDateString('vi-VN'),
                item.parentEmail,
                item.parentName,
                item.studentName,
                item.result.status,
                item.result.result,
                item.result.note
            )
        );
        await this.prisma.vaccinationResult.updateMany({
            where: { vaccinationEventID: id },
            data: {
                isSend: true
            }
        })
        return successResponse(200, 'Gửi mail thông báo đến phụ huynh thành công')

    }
}