import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllMedicinerQuery } from "../dtos/getAllMedicine.nurse.query";
import { contains } from "class-validator";
import { SendRequestManagerDTO } from "../dtos/sendRequestManager.nurse.dto";

@Injectable()
export class SendRequestNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async send(data: SendRequestManagerDTO, reqUser) {
        try {
            const createMedicineSupplyRequest = await this.prisma.medicineSupplyRequest.create({
                data: {
                    note: data.note,
                    createdBy: reqUser.id
                }
            })
            const requestItems = data.items.map((item) => ({
                requestId: createMedicineSupplyRequest.id,
                // requestId: 1,
                ...item
            })
            )
            await this.prisma.requestItem.createMany({
                data: requestItems
            })
            return successResponse(200, 'Gửi yêu cầu đến manager thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Gửi yêu cầu đến manager thất bại')
        }
    }
}