import { RequestItem } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetDetailRequestManagerNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetailRequest(id: number, reqUser) {
        // Check xem id tồn tại ko
        const request = await this.prisma.medicineSupplyRequest.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                note: true,
                status: true,
                createdBy: true,
                items: {
                    select: {
                        quantity: true,
                        urgency: true,
                        note: true,
                        medicine: {
                            select: {
                                name: true,
                                image: true,
                            }
                        },
                        medicineSupply: {
                            select: {
                                name: true,
                                image: true,
                            }
                        }
                    }
                }
            }
        })
        if (!request) {
            return errorResponse(400, 'ID không tồn tại trong hệ thống')
        }
        if (request?.createdBy !== reqUser.id) {
            return errorResponse(400, 'Bạn không có quyền truy cập')
        }

        return successResponse(200, request, 'Lấy thông tin chi tiết yêu cầu đến manager thành công')
    }
}