import { ParentInfo } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { HealthCheckupMeetingRequestDto } from "../dtos/createMeetingCheckUp.nurse.dto";
import { MailService } from "src/modules/common/mail/mail.service";

@Injectable()
export class CheckMeetingNurseService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async checkSchedule(datetime: string) {
        const parsedDate = new Date(datetime);

        if (isNaN(parsedDate.getTime())) {
            return errorResponse(400, 'Thời gian không hợp lệ');
        }

        // Tính khoảng thời gian trước và sau 10 phút
        const start = new Date(parsedDate.getTime() - 10 * 60 * 1000);
        const end = new Date(parsedDate.getTime() + 10 * 60 * 1000);

        const hasRequest = await this.prisma.healthCheckupMeetingRequest.findFirst({
            where: {
                scheduledAt: {
                    gte: start,
                    lte: end,
                },
            },
        });

        return successResponse(200, {
            isAvailable: !hasRequest,
        });
    } catch(error) {
        console.error('Lỗi kiểm tra lịch hẹn:', error);
        return errorResponse(500, 'Đã xảy ra lỗi khi kiểm tra lịch hẹn');
    }
}