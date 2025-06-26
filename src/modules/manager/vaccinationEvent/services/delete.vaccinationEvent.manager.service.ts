import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

enum EventStatus {
    DRAFT,
    CONFIRMED,
    CANCELED,
}
@Injectable()
export class DeleteVaccinationEventManagerService {
    constructor(private readonly prisma: PrismaService) { }
    async delete(vaccinationEventID: number) {
        const vaccinationEvent = await this.prisma.vaccinationEvent.findUnique({
            where: { id: vaccinationEventID }
        })
        if (!vaccinationEvent) {
            return errorResponse(400, `Không tìm thấy thông tin tiêm chủng nào có id ${vaccinationEventID}`)
        }
        if (vaccinationEvent.status == "DRAFT") {
            await this.prisma.$transaction([
                this.prisma.vaccinationTarget.deleteMany({
                    where: { vaccinationEventID }
                }),
                this.prisma.vaccineEventStock.deleteMany({
                    where: { vaccinationEventID }
                }),
                this.prisma.vaccinationEvent.delete({
                    where: { id: vaccinationEventID }
                })
            ])

        } else if (vaccinationEvent.status == "SUCCESSED") {
            this.prisma.vaccinationEvent.update({
                where: { id: vaccinationEventID },
                data: {
                    status: "DELETED"
                }
            })
        } else {
            return errorResponse(400, 'Cuộc tiêm chủng đã được phát hành không thể xóa ')
        }
        return successResponse(200, 'Cuộc tiêm chủng đã được xóa thành công')


    }
}