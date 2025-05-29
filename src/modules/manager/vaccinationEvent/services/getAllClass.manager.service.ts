import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetAllClassManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAll() {
        try {
            const allClass = await this.prisma.class.findMany({
                select: {
                    id: true,
                    name: true
                }
            })
            return successResponse(200, allClass, 'Lấy danh sách lớp học thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy danh sách lớp học thất bại')
        }
    }
}