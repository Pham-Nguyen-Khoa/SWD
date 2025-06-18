import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";

@Injectable()
export class DeleteMedicalEventNurseService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async delete(id: number) {
        // Kiểm tra id 
        const medicalEvent = await this.prisma.medicalEvent.findUnique({
            where: { id }
        })
        if (!medicalEvent) {
            return errorResponse(400, 'ID sự kiện y tế không tồn tại')
        }
        if (medicalEvent.status === "HOSPITALDISCHARGE" || medicalEvent.status === "HOSPITALIZED") {
            await this.prisma.hospitalTransfer.delete({
                where: {
                    medicalEventID: id
                }
            })
        } else {
            await this.prisma.treatment.deleteMany({
                where: {
                    medicalEventID: id
                }
            })
        }
        await this.prisma.medicalEvent.delete({
            where: { id }
        })
        return successResponse(200, 'Xóa sự kiện y tế thành công')
    }
}