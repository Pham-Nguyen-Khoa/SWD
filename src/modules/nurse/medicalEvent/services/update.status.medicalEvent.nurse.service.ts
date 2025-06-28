import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";


@Injectable()

export class UpdateStatusMedicalEventNurseService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async updateStatus(id: number) {
        const medicalEventEntity = await this.prisma.medicalEvent.findUnique({
            where: {
                id
            }
        })
        if (!medicalEventEntity) {
            return errorResponse(400, 'ID Sự kiện y tế không tồn tại')
        }
        const status = medicalEventEntity.status;
        let statusUpdate: any = "";
        switch (status) {
            case "PENDING": {
                statusUpdate = "PROCESSING";
                break;
            }
            case "PROCESSING": {
                statusUpdate = "COMPLETED";
                break;
            }
            case "HOSPITALIZED": {
                statusUpdate = "HOSPITALDISCHARGE";
                break;
            }
            case "HOSPITALDISCHARGE": {
                statusUpdate = "COMPLETED";
                break;
            }
            default: {
                statusUpdate = "COMPLETED"
            }
        }
        try {
            await this.prisma.medicalEvent.update({
                where: { id },
                data: {
                    status: statusUpdate
                }
            })
        } catch (error) {
            return errorResponse(400, 'Cập nhật trạng thái thất bại')
        }
        return successResponse(200, 'Cập nhật trạng thái thành công')


    }
}