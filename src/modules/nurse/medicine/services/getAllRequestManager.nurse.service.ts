import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { DateHelper } from "src/helpers/date.helper";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllRequestManagerNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAllRequest(reqUser) {
        const requests: any = await this.prisma.medicineSupplyRequest.findMany({
            where: {
                createdBy: reqUser.id
            }
        })
        requests.map(request => request.createdAt = DateHelper.formatDateToDDMMYYYY(DateHelper.formatDateToDateString(request.createdAt)))
        return successResponse(200, requests, 'Lấy ra danh sách các yêu cầu đến manager thành công')
    }
}