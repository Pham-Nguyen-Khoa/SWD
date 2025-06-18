import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { DateHelper } from "src/helpers/date.helper";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";


@Injectable()

export class GetAllMedicalEventNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getAll() {
        try {

            const medicalEventEnitites = await this.prisma.medicalEvent.findMany({
                orderBy: {
                    id: "desc"
                },
                select: {
                    id: true,
                    studentID: true,
                    type: true,
                    occurredAt: true,
                    status: true,
                }
            })
            const medicalWithStudentInfo = await Promise.all(
                medicalEventEnitites.map(async (medical) => {
                    const studentInfo = await this.getDetailStudentAdminService.getDetail(medical.studentID);
                    return {
                        ...medical,
                        studentInfo,
                    };
                })
            );

            return successResponse(200, medicalWithStudentInfo, 'Lấy danh sách các sự kiện y tế thành công',)
        } catch (error) {
            return errorResponse(400, 'Lấy danh sách các sự kiện y tế thất bại',)

        }


    }
}