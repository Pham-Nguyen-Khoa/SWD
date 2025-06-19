import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class GetAllMedicineRequestNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getAll(query: GetAllMedicineRequestNurseQuery) {
        try {
            let whereClause: any = {}
            if (query) {
                whereClause.status = query.status
            }
            const [medicineRequest, total] = await Promise.all([
                await this.prisma.medicineRequest.findMany({
                    where: whereClause,
                    select: {
                        id: true,
                        studentID: true,
                        note: true,
                        status: true,
                        createdAt: true,
                        receivedAt: true,
                    }
                }),
                await this.prisma.medicineRequest.count({}),

            ])
            const medicineRequestWithStudentInfo = await Promise.all(
                medicineRequest.map(async (request) => {
                    const studentInfo = await this.getDetailStudentAdminService.getDetail(request.studentID);
                    return {
                        ...request,
                        studentInfo,
                    };
                })
            );
            const result = {
                total,
                medicineRequestWithStudentInfo
            }
            return successResponse(200, result, 'Lấy danh sách các đơn gửi thuốc của phụ huynh thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy danh sách các đơn gửi thuốc của phụ huynh thất bại')
        }
    }
}