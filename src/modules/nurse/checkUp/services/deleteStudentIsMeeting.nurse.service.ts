import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class DeleteStudentIsMeetingNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async delete(id: number, reqUser) {
        const resultEntity = await this.prisma.healthCheckupResult.findUnique({
            where: {
                id
            }
        })
        if (!resultEntity) {
            return errorResponse(400, 'Không tìm thấy để xóa')
        }
        await this.prisma.healthCheckupResult.update({
            where: {
                id
            },
            data: {
                isMeeting: false,
                updatedBy: reqUser.id
            }
        })
        return successResponse(200, 'Xóa thành công')

    }
}