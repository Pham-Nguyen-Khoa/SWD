import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { DateHelper } from "src/helpers/date.helper";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";


@Injectable()
export class GetDetailResultCheckUpNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService

    ) { }
    async getDetailCheckupResult(checkupID: number, studentID: number) {
        const checkup = await this.prisma.healthCheckup.findUnique({
            where: { id: checkupID },
            include: {
                HealthCheckupContent: true,
                HealthCheckupResponse: {
                    where: { status: 'ACCEPTED', studentID },
                    select: {
                        studentID: true
                    }
                },
            },
        });

        if (!checkup) {
            return errorResponse(404, 'Không tìm thấy buổi khám');
        }

        const contents = checkup.HealthCheckupContent;

        const overall = await this.prisma.healthCheckupResult.findUnique({
            where: {
                healthCheckUpID_studentID: {
                    healthCheckUpID: checkupID,
                    studentID: studentID,
                },
            },
        });

        // Kết quả từng nội dung
        const contentResults = await this.prisma.healthCheckupContentResult.findMany({
            where: {
                studentID: studentID,
                contentID: { in: contents.map(c => c.id) },
            },
        });
        const student = await this.getDetailStudentAdminService.getDetail(studentID)
        const result = {
            studentID: student.id,
            student_code: student.student_code,
            fullname: student.account.fullname,
            className: student.lastAcamedicYear?.class.name,
            grade: student.lastAcamedicYear?.class.grade,
            status: overall?.status || 'PENDING',
            overallNotes: overall?.overallNotes || null,
            results: contents.map(content => {
                const match = contentResults.find(r => r.contentID === content.id);
                return {
                    contentID: content.id,
                    contentTitle: content.name,
                    value: match?.value || null,
                    note: match?.note || null,
                };
            }),
        };
        return successResponse(200, result, 'Lấy kết quả chi tiết học sinh thành công')



    }


}