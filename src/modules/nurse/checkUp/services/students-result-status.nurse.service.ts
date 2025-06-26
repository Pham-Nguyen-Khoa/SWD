import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";

@Injectable()
export class StudentResultStatusCheckUpNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService

    ) { }
    async execute(checkupID: number) {
        const checkup = await this.prisma.healthCheckup.findUnique({
            where: { id: checkupID },
            include: {
                HealthCheckupTarget: true,
                HealthCheckupContent: { select: { id: true } },
            },
        });

        if (!checkup) {
            return errorResponse(400, 'Không tìm thấy buổi khám')
        }

        // const today = new Date();
        // if (today < new Date(checkup.scheduledAt)) {
        //     return errorResponse(400, 'Buổi khám sức khỏe chưa diễn ra');
        // }

        const contentIDs = checkup.HealthCheckupContent.map(c => c.id);

        // Lấy danh sách studentID mà phụ huynh đã đồng ý
        const acceptedResponses = await this.prisma.healthCheckupResponse.findMany({
            where: {
                healthCheckUpID: checkupID,
                status: 'ACCEPTED',
            },
            select: { studentID: true },
        });

        const studentIDs = acceptedResponses.map(r => r.studentID);

        // Lấy toàn bộ học sinh với thông tin
        const students = await Promise.all(
            studentIDs.map((studentID) =>
                this.getDetailStudentAdminService.getDetail(studentID)
            )
        );

        // Lấy kết quả đã ghi
        const results = await this.prisma.healthCheckupContentResult.findMany({
            where: {
                contentID: { in: contentIDs },
                studentID: { in: studentIDs },
            },
            select: { studentID: true },
        });

        const resultSet = new Set(results.map(r => r.studentID));

        const resultTotal = students.map(student => ({
            studentID: student.id,
            student_code: student.student_code,
            gender: student.gender,
            fullName: student.account.fullname,
            className: student.lastAcamedicYear?.class.name,
            grade: student.lastAcamedicYear?.class.grade,
            hasResult: resultSet.has(student.id),
        }));
        return successResponse(200, resultTotal, 'Lấy danh sách học sinh khám và trạng thái kết quả thành công')
    }
}