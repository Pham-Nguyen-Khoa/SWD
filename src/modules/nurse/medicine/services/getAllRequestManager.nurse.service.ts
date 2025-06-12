import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllRequestManagerNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAllRequest(reqUser) {
        const requests = await this.prisma.medicineSupplyRequest.findMany({
            where: {
                createdBy: reqUser.id

            }
        })
        return successResponse(200, requests,'Lấy ra danh sách các yêu cầu đến manager thành công')
    }
}