import { Injectable } from "@nestjs/common";
import { successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";

@Injectable()
export class GetAllIsMeetingNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getAll() {
        const meetingEntities = await this.prisma.healthCheckupMeetingRequest.findMany();
        return successResponse(200, meetingEntities, 'Lấy danh sách các cuộc hẹn phụ huỳnh thành công')
    }
}