import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";


@Injectable()
export class AcceptedMedicineRequestNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService
    ) { }
    async accept(id: number, reqUser) {
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
                }
            }
        })
        if (!medicineRequest) {
            return errorResponse(400, 'ID đơn thuốc không tồn tại')
        }
        try {
            await this.prisma.medicineRequest.update({
                where: { id },
                data: {
                    status: "CONFIRMED_NOT_RECEIVED",
                    confirmedAt: new Date(),
                    updatedBy: reqUser.id
                }
            })
            this.mailService.sendAcceptedMedicineRequest(medicineRequest.parent.account.email, medicineRequest.student.account.fullname)
            return successResponse(200, 'Đồng ý tiếp nhận đơn thuốc của phụ huynh thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Đồng ý tiếp nhận đơn thuốc của phụ huynh thất bại')

        }
    }
}