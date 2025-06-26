import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

enum EventStatus {
    DRAFT,
    CONFIRMED,
    CANCELED,
}
@Injectable()
export class DeleteCheckUpManagerService {
    constructor(private readonly prisma: PrismaService) { }
    async delete(checkUpID: number) {
        const checkUpEvent = await this.prisma.healthCheckup.findUnique({
            where: { id: checkUpID }
        })
        if (!checkUpEvent) {
            return errorResponse(400, `Không tìm thấy thông tin cuộc khám sức khỏe  nào có id ${checkUpID}`)
        }
        if (checkUpEvent.status == "DRAFT") {
            await this.prisma.$transaction([
                this.prisma.healthCheckupTarget.deleteMany({
                    where: { healthCheckUpID: checkUpID },
                }),
                this.prisma.healthCheckupContent.deleteMany({
                    where: { healthCheckUpID: checkUpID },
                }),
                this.prisma.healthCheckupStock.deleteMany({
                    where: { healthCheckUpID: checkUpID },
                }),
                this.prisma.healthCheckup.delete({
                    where: { id: checkUpID },
                }),
            ]);
        } else if (checkUpEvent.status == "SUCCESSED") {
            await this.prisma.healthCheckup.update({
                where: { id: checkUpID },
                data: {
                    status: "DELETED"
                }
            })
        } else {
            return errorResponse(400, 'Cuộc khám sức khỏe  đã được phát hành không thể xóa ')
        }
        return successResponse(200, 'Cuộc khám sức khỏe  đã được xóa thành công')

    }
}