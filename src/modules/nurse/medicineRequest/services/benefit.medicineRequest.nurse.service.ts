import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";


@Injectable()
export class BenefitMedicineRequestNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService

    ) { }
    async benefit(id: number, reqUser) {
        // kiểm tra id tồn tại
        const medicineRequest = await this.prisma.medicineRequest.findUnique({
            where: { id },
            select: {
                parent: {
                    select: {
                        account: {
                            select: {
                                fullname: true,
                                email: true
                            }
                        }
                    }
                },
                student: {
                    select: {
                        account: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                },
                MedicineRequestItem: true,
            }
        })
        if (!medicineRequest) {
            return errorResponse(400, 'ID đơn thuốc không tồn tại')
        }
        try {
            await this.prisma.medicineRequest.update({
                where: { id },
                data: {
                    isBenefit: true,
                    updatedBy: reqUser.id
                }
            })
            const medicines = medicineRequest.MedicineRequestItem.map(item => item.medicineName)
            console.log(medicines)
            this.mailService.sendBenefitMedicineRequest(medicineRequest.parent.account.email, medicineRequest.student.account.fullname, medicines)
            return successResponse(200, 'Thông báo đề xuất tạm ngưng uống thuốc cho học sinh thành công')
        } catch (error) {
            return errorResponse(400, 'Thông báo đề xuất tạm ngưng uống thuốc cho học sinh thất bại')

        }
    }
}