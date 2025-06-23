import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { DateHelper } from "src/helpers/date.helper";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";
import { GetAllMedicineRequestParentQuery } from "../dtos/getAll.medicineRequest.nurse.dto";

@Injectable()
export class GetAllMedicineRequestParentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService
    ) { }
    async getAll(query: GetAllMedicineRequestParentQuery, reqUser) {
        // Lấy parent 
        const { status, isBenefit = false } = query
        const parentEntity = await this.prisma.parent.findFirst({
            where: {
                accountID: reqUser.id
            },
            select: {
                id: true,
            }

        })
        if (!parentEntity) {
            return errorResponse(400, 'Phụ huynh không tồn tại')
        }
        let whereClause: any = {
            parentID: parentEntity.id
        }
        if (status) {
            whereClause.status = query.status
        }
        if (isBenefit) {
            whereClause.isBenefit = isBenefit
            whereClause.acceptedBenefit = false
        }
        const medicineRequestEntities = await this.prisma.medicineRequest.findMany({
            where: whereClause,
        })
        const result = await Promise.all(
            medicineRequestEntities.map(async (request) => {
                const studentInfo = await this.getDetailStudentAdminService.getDetail(request.studentID);
                return {
                    ...request,
                    studentInfo,
                };
            })
        );
        return successResponse(200, result, 'Lấy danh sách các đơn thuốc thành công')
    }
}