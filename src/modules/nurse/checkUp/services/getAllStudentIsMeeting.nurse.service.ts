import { Injectable } from "@nestjs/common";
import { successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";

@Injectable()
export class GetAllStudentIsMeetingNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getAll() {
        const meetings = await this.prisma.healthCheckupResult.findMany({
            where: {
                isMeeting: true
            },
            select: {
                id: true,
                healthCheckUpID: true,
                studentID: true,
                healthCheckup: {
                    select: {
                        title: true,
                        scheduledAt: true,
                    }
                },
            }
        })

        // Gắn thông tin học sinh
        const medicalWithStudentInfo = await Promise.all(
            meetings.map(async (meeting) => {
                const studentInfo = await this.getDetailStudentAdminService.getDetail(meeting.studentID);
                const formatStudentInfo = {
                    student_code: studentInfo.student_code,
                    fullname: studentInfo.account.fullname,
                    parentName: studentInfo.ParentInfo.fullname,
                    parentPhone: studentInfo.ParentInfo.phone,
                    class: studentInfo.lastAcamedicYear?.class.name
                }
                return {
                    ...meeting,
                    formatStudentInfo,
                };
            })
        );
        return successResponse(200, medicalWithStudentInfo, 'Danh sách các học sinh đánh dấu bất bình thường ')
    }
}