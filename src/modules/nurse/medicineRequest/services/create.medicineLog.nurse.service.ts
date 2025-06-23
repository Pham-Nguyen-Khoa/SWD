import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { CreateMedicineLogDto } from "../dtos/create.medicineLog.nurse.dto";


@Injectable()
export class CreateMedicineLogNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService

    ) { }
    async createLog(id: number, reqUser, dto: CreateMedicineLogDto) {

        const item = await this.prisma.medicineRequestItem.findUnique({
            where: { id: id },
            select: { usageTimes: true }
        });

        if (!item) {
            return errorResponse(400, 'Không tìm thấy thuốc')
        }

        if (!item.usageTimes.includes(dto.timeToTake)) {
            return errorResponse(400, `Khung giờ ${dto.timeToTake} không nằm trong giờ uống thuốc đã khai báo`)

        }
        const now = new Date();

        // Parse khung giờ cần ghi
        const [hour, minute] = dto.timeToTake.split(':').map(Number);

        // Tính khoảng thời gian +/- 10 phút quanh giờ cần uống
        const from = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute - 10, 0);
        const to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute + 10, 59);

        // Tìm log nào đã ghi cho khung giờ này
        const existingLog = await this.prisma.medicineLog.findFirst({
            where: {
                medicineRequestItemID: id,
                takenAt: {
                    gte: from,
                    lte: to
                }
            }
        });

        if (existingLog) {
            return errorResponse(400, `Đã ghi nhận uống thuốc cho khung giờ ${dto.timeToTake}`)
        }

        const takenAt = new Date();
        takenAt.setHours(hour, minute, 0, 0);
        await this.prisma.medicineLog.create({
            data: {
                medicineRequestItemID: id,
                takenAt: takenAt,
                givenBy: reqUser.id,
                note: dto.note || null,
            }
        });


        await this.prisma.medicineRequestItem.update({
            where: {
                id
            },
            data: {
                quantityRemaining: {
                    decrement: 1
                }
            }
        })
        const newMedicineRequestItem = await this.prisma.medicineRequestItem.findUnique({
            where: {
                id
            },
            include: {
                MedicineRequest: true
            }
        })
        if (newMedicineRequestItem) {
            const studentInfo = await this.getDetailStudentAdminService.getDetail(newMedicineRequestItem?.MedicineRequest.studentID)
            if (newMedicineRequestItem.quantityRemaining <= 2 && !newMedicineRequestItem.isLowStockNotified) {
                // Gửi thông báo 
                try {
                    await this.mailService.sendLowStockNotified(studentInfo.ParentInfo.email, studentInfo.account.fullname, newMedicineRequestItem.medicineName, newMedicineRequestItem.quantityRemaining)
                    // Đánh dấu đã gửi cảnh báo
                    await this.prisma.medicineRequestItem.update({
                        where: { id },
                        data: { isLowStockNotified: true }
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        }

        return successResponse(200, 'Ghi nhận cho uống thuốc thành công')
    }

}