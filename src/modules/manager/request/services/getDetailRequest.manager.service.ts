import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class DetailRequestManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async detail(id: number) {
        const requestEntity: any = await this.prisma.medicineSupplyRequest.findUnique({
            where: { id },
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
                                image: true
                            }
                        },
                        medicineSupply: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                }
            }
        })
        if (!requestEntity) {
            return errorResponse(400, 'ID yêu cầu không tồn tại', 'REQUEST_NOT_FOUND')
        }
        const nurseInfo = await this.prisma.account.findUnique({
            where: { id: requestEntity.id },
            select: { fullname: true }
        })
        requestEntity.createdBy = nurseInfo?.fullname
        return successResponse(200, requestEntity, 'Lấy thông tin chi tiết yêu cầu thành công')

    }
}