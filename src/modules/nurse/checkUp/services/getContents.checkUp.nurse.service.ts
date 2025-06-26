import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetCheckupContentsService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(checkupID: number) {
        const checkup = await this.prisma.healthCheckup.findUnique({
            where: { id: checkupID },
            include: {
                HealthCheckupContent: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        inputType: true
                    },
                },
            },
        });

        if (!checkup) {
            return errorResponse(400, 'Không tìm thấy buổi khám sức khỏe');
        }

        return successResponse(200, checkup.HealthCheckupContent, 'Lấy danh sách nội dung thành công');
    }
}
