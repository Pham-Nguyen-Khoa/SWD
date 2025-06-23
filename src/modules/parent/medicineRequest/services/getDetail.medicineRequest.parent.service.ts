import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { DateHelper } from "src/helpers/date.helper";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";

@Injectable()
export class GetDetailMedicineRequestParentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getDetail(id: number, query: any, reqUser: any) {
        // const dateStr = query.date;
        // const getAll = query.all === 'true';

        // let takenAtCondition: any = undefined;

        // if (!getAll) {
        //     const date = dateStr ? new Date(dateStr) : new Date();
        //     const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        //     const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

        //     takenAtCondition = {
        //         gte: start,
        //         lte: end
        //     };
        // }

        const request = await this.prisma.medicineRequest.findUnique({
            where: { id },
            include: {
                student: {
                    include: {
                        account: { select: { fullname: true } }
                    }
                },
                MedicineRequestItem: {
                    include: {
                        MedicineLog: true
                    }
                }
            }
        });

        if (!request) {
            return errorResponse(404, 'Không tìm thấy đơn thuốc');
        }

        const result = {
            requestID: request.id,
            status: request.status,
            // startDate: request.startDate,
            // endDate: request.endDate,
            studentName: request.student.account.fullname,
            items: request.MedicineRequestItem.map(item => ({
                medicineItemID: item.id,
                medicineName: item.medicineName,
                dosage: item.dosage,
                quantityRemaining: item.quantityRemaining,
                usageTimes: item.usageTimes,
                logs: item.MedicineLog.map(log => ({
                    takenAt: log.takenAt,
                    note: log.note
                }))
            }))
        };

        return successResponse(200, result, 'Lấy chi tiết đơn thuốc thành công');
    }
}