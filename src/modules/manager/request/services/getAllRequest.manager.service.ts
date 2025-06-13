import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { DateHelper } from "src/helpers/date.helper"

@Injectable()
export class GetAllRequestService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async allRequest() {
        try {
            const allRequest: any = await this.prisma.medicineSupplyRequest.findMany({
                select: {
                    id: true,
                    note: true,
                    status: true,
                    createdAt: true,
                    createdBy: true,
                }
            });
            if (allRequest.length > 0) {
                for (const request of allRequest) {
                    if (request.createdBy !== null) {
                        const info = await this.prisma.account.findUnique({
                            where: { id: request.createdBy }
                        });

                        if (info) {
                            request.createdBy = info.fullname;
                        }
                        request.createdAt = DateHelper.formatDateToDDMMYYYY(DateHelper.formatDateToDateString(request.createdAt))
                    }
                }
            }
            return successResponse(200, allRequest, 'Lấy danh sách các yêu cầu thành công ')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy danh sách các yêu cầu thất bại')
        }

    }
}