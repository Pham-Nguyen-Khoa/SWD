import { ParentInfo } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { HealthCheckupMeetingRequestDto } from "../dtos/createMeetingCheckUp.nurse.dto";
import { MailService } from "src/modules/common/mail/mail.service";

@Injectable()
export class CompleteMeetingNurseService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async complete(id: number, reqUser) {
        const checkExist = await this.prisma.healthCheckupMeetingRequest.findUnique({
            where: {
                id
            }
        })
        if (!checkExist) {
            return errorResponse(400, 'ID Không tồn tại')
        }
        await this.prisma.healthCheckupMeetingRequest.update({
            where: { id },
            data: {
                status: "COMPLETED",
                updatedBy: reqUser.id
            }
        })
   
        return successResponse(200, 'Hoàn tất cuộc trao đổi thành công')
    }
}