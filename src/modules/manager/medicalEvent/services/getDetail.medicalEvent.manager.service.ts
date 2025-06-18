import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";


@Injectable()

export class GetDetailMedicalEventManagerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getDetail(id: number) {
        const medicalEventEntity = await this.prisma.medicalEvent.findUnique({
            where: { id },
            include: {
                HospitalTransfer: true,
                Treatment: {
                    select: {
                        quantity: true,
                        dosage: true,
                        medicine: {
                            select: {
                                name: true,
                                image: true
                            }
                        },
                        medicineSupply: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                },
            }
        })
        if (!medicalEventEntity) {
            return errorResponse(400, 'Không tìm thấy sự kiện y tế có id này')
        }
        const studentInfo = await this.getDetailStudentAdminService.getDetail(medicalEventEntity?.studentID);
        let nurseInfo: any = {}
        if (medicalEventEntity.createdBy) {
            nurseInfo = await this.prisma.account.findUnique({
                where: {
                    id: medicalEventEntity.createdBy
                },
                select: {
                    fullname: true,
                }
            })
        }
        const data = {
            medicalEventEntity,
            nurseInfo,
            studentInfo
        }
        return successResponse(200, data, 'Lấy thông tin chi tiết sự kiện y tế thành công')

    }
}