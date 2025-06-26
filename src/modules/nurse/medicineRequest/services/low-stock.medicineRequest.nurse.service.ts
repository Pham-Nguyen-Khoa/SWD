import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { GetAllLowStockNurseQuery } from "../dtos/low-stock.medicineRequest.nurse.query";


@Injectable()
export class GetAllLowStockNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async lowStock(query: GetAllLowStockNurseQuery) {
        const today = new Date();
        const { search } = query
        const whereClause: any = {
            quantityRemaining: { lte: 2 },
            startDate: { lte: today },
            endDate: { gte: today },
            MedicineRequest: {
                status: 'CONFIRMED_RECEIVED',
                student: {}
            }
        };
        if (search) {
            whereClause.MedicineRequest.student.OR = [
                { student_code: { contains: search, mode: 'insensitive' } },
                {
                    account: {
                        OR: [
                            { fullname: { contains: search, mode: 'insensitive' } },
                            { email: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                }
            ];
        }

        const items = await this.prisma.medicineRequestItem.findMany({
            where: whereClause,
            include: {
                MedicineRequest: true
            }
        });

        // Gắn thông tin học sinh
        const itemsWithStudentInfo = await Promise.all(
            items.map(async (item) => {
                const studentInfo = await this.getDetailStudentAdminService.getDetail(item.MedicineRequest.studentID);
                return {
                    ...item,
                    studentInfo,
                };
            })
        );
        return successResponse(200, itemsWithStudentInfo.map(item => ({
            medicineItemID: item.id,
            studentID: item.MedicineRequest.studentID,
            student_code: item.studentInfo.student_code,
            studentName: item.studentInfo.account.fullname,
            className: item.studentInfo.lastAcamedicYear?.class.name || 'Chưa có lớp',
            parentname: item.studentInfo.ParentInfo.fullname,
            parentPhone: item.studentInfo.ParentInfo.phone,
            medicineName: item.medicineName,
            quantityRemaining: item.quantityRemaining,
            // dosage: item.dosage,
            // usageTimes: item.usageTimes,
            requestID: item.MedicineRequest.id
        })), 'Danh sách thuốc sắp hết');
    }
}