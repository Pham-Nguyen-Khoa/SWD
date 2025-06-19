import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class GetDetailMedicineRequestNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async detail(id: number) {
        // check id tồn tại 
        const medicineRequestEntity = await this.prisma.medicineRequest.findUnique({
            where: {
                id
            },
            include: {
                MedicineRequestItem: true
            }
        })
        if (!medicineRequestEntity) {
            return errorResponse(400, 'ID Đơn thuốc phụ huynh gửi không tồn tại')
        }
        const studentInfo = await this.getDetailStudentAdminService.getDetail(medicineRequestEntity.studentID);
        const result = {
            studentInfo,
            medicineRequestEntity
        }
        return successResponse(200, result, 'Lấy thông tin chi tiết đơn thuốc phụ huynh gửi thành công')

    }
}