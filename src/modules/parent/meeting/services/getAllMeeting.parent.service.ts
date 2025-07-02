import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { StudentParentService } from "../../health/services/student.parent.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { successResponse } from "src/common/utils/response.util";


@Injectable()
export class GetAllMeetingParentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly studentParentService: StudentParentService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService

    ) { }
    async getAll(reqUser) {
        const studentOfParent = await this.studentParentService.student(reqUser);
        const studentIDs = studentOfParent.data.map(student => student.id);
        const meetingEntities = await this.prisma.healthCheckupMeetingRequest.findMany({
            where: {
                studentID: { in: studentIDs }
            }
        })
        // Gắn thông tin học sinh
        const medicalWithStudentInfo = await Promise.all(
            meetingEntities.map(async (meeting) => {
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
        return successResponse(200, medicalWithStudentInfo, 'Lấy danh sách các thông báo y tế hẹn')
    }
}