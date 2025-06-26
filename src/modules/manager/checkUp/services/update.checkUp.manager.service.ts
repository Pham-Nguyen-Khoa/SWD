import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateCheckUpDTO } from "../dtos/update.checkUp.manager.dto";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { DateHelper } from "src/helpers/date.helper";

enum CheckUpTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS'
}

@Injectable()
export class UpdateCheckUpManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async update(data: UpdateCheckUpDTO, id: number, reqUser) {
        // check id tồn tại
        const checkUpEntity = await this.prisma.healthCheckup.findUnique({
            where: {
                id
            }
        })
        if (!checkUpEntity) {
            return errorResponse(400, 'ID cuộc khám sức khỏe định kỳ không tồn tại')
        }
        if (checkUpEntity.status === "CONFIRMED") {
            return errorResponse(400, 'Cuộc khám sức khỏe định kỳ  này đã được xác nhận và gửi thông báo đến phụ huynh học sinh')
        }
        if (data.scheduledAt) {
            const newDate = DateHelper.parseDateStringToDate(data.scheduledAt);
            const now = new Date();

            // So sánh ngày phải >= 5 ngày sau thời điểm hiện tại
            const minDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 ngày sau
            if (newDate < minDate) {
                return errorResponse(400, 'Ngày khám sức khỏe định kỳ  phải cách hiện tại ít nhất 5 ngày');
            }
        }

        await this.prisma.healthCheckup.update({
            where: { id },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.description && { description: data.description }),
                ...(data.scheduledAt && {
                    scheduledAt: DateHelper.parseDateStringToDate(data.scheduledAt),
                }),
                updatedBy: reqUser.id,
            },
        });

        if (data.targetType) {
            // Xóa tất cả target cũ
            await this.prisma.healthCheckupTarget.deleteMany({
                where: { healthCheckUpID: id },
            });

            if (data.targetType === CheckUpTargetType.SCHOOL) {
                await this.prisma.healthCheckupTarget.create({
                    data: {
                        healthCheckUpID: id,
                        targetType: CheckUpTargetType.SCHOOL,
                        targetID: 0,
                    },
                });
            } else if (
                (data.targetType === CheckUpTargetType.GRADE ||
                    data.targetType === CheckUpTargetType.CLASS) &&
                Array.isArray(data.targetIds) &&
                data.targetIds.length > 0
            ) {
                const targetsToCreate = data.targetIds.map((targetID) => ({
                    healthCheckUpID: id,
                    targetType: data.targetType!,
                    targetID,
                }));

                await this.prisma.healthCheckupTarget.createMany({
                    data: targetsToCreate,
                    skipDuplicates: true,
                });
            } else {
                return errorResponse(
                    400,
                    'Thiếu danh sách targetIds cho loại mục tiêu đã chọn'
                );
            }
        }
        return successResponse(200, 'Cập nhật cuộc khám sức khỏe định kỳ  thành công')

    }
}