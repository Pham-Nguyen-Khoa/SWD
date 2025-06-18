import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { DateHelper } from "src/helpers/date.helper";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicalEventManagerQuery } from "../dtos/getAll.medicalEvent.manager.query";


@Injectable()

export class GetAllMedicalEventManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getAllForManager(query: GetAllMedicalEventManagerQuery) {

        try {
            let whereClause: any = {}
            const { status } = query;
            if (status) {
                whereClause.status = status
            }
            // Lấy toàn bộ sự kiện y tế (giống như của nurse)
            const medicalEventEntities = await this.prisma.medicalEvent.findMany({
                where: whereClause,
                orderBy: {
                    id: 'desc'
                },
                select: {
                    id: true,
                    studentID: true,
                    type: true,
                    occurredAt: true,
                    status: true,
                    severity: true,
                    createdBy: true
                }
            });

            // Gắn thông tin học sinh
            const medicalWithStudentInfo = await Promise.all(
                medicalEventEntities.map(async (medical) => {
                    const studentInfo = await this.getDetailStudentAdminService.getDetail(medical.studentID);
                    let nurseInfo: any = {}
                    if (medical.createdBy) {
                        nurseInfo = await this.prisma.account.findUnique({
                            where: {
                                id: medical.createdBy
                            },
                            select: {
                                fullname: true,
                            }
                        })
                    }
                    return {
                        ...medical,
                        studentInfo,
                        nurseInfo
                    };
                })
            );

            // Thống kê theo status
            const countByStatus = await this.prisma.medicalEvent.groupBy({
                by: ['status'],
                _count: {
                    status: true
                }
            });

            // Thống kê theo severity (nếu có)
            const countBySeverity = await this.prisma.medicalEvent.groupBy({
                by: ['severity'],
                _count: {
                    severity: true
                }
            });

            // Tổng số sự kiện y tế
            const totalCount = await this.prisma.medicalEvent.count();

            return successResponse(200, {
                list: medicalWithStudentInfo,
                statistics: {
                    total: totalCount,
                    byStatus: countByStatus,
                    bySeverity: countBySeverity
                }
            }, 'Lấy danh sách và thống kê sự kiện y tế thành công');
        } catch (error) {
            console.error(error);
            return errorResponse(400, 'Lấy danh sách và thống kê sự kiện y tế thất bại');
        }
    }

}