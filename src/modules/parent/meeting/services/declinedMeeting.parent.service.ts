import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { StudentParentService } from "../../health/services/student.parent.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class DeclineMeetingParentService {
    constructor(
        private readonly prisma: PrismaService,

    ) { }
    async declined(id: number, reqUser) {
        const exist = await this.prisma.healthCheckupMeetingRequest.findUnique({ where: { id } })
        if (!exist) {
            return errorResponse(400, 'ID không tồn tại')
        }
        await this.prisma.healthCheckupMeetingRequest.update({
            where: { id },
            data: {
                status: "DECLINED",
                updatedBy: reqUser.id
            }
        })
        return successResponse(200, 'Từ chối lịch hẹn trao đổi sức khỏe học sinh thành công')
    }
}