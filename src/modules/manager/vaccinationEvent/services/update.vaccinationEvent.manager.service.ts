import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateVaccinationEventDTO } from "../dtos/create.vaccinationEvent.manager.dto";
import { DateHelper } from "src/helpers/date.helper";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { UpdateVaccinationEventDTO } from "../dtos/update.vaccinationEvent.manager.dto";

enum VaccinationTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS'
}

@Injectable()
export class UpdateVaccinationEventManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async update(id: number, data: UpdateVaccinationEventDTO, reqUser) {
        const vaccinationEvent = await this.prisma.vaccinationEvent.findUnique({
            where: { id },
        });

        if (!vaccinationEvent) {
            return errorResponse(400, 'Không tìm thấy sự kiện tiêm chủng');
        }
        if (vaccinationEvent.status === "CONFIRMED") {
            return errorResponse(400, 'Cuộc tiêm chủng này đã được xác nhận và gửi thông báo đến phụ huynh học sinh')
        }
        if (data.scheduledAt) {
            const newDate = DateHelper.parseDateStringToDate(data.scheduledAt);
            const now = new Date();

            // So sánh ngày phải >= 5 ngày sau thời điểm hiện tại
            const minDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 ngày sau
            if (newDate < minDate) {
                return errorResponse(400, 'Ngày tiêm chủng phải cách hiện tại ít nhất 5 ngày');
            }

        }
        await this.prisma.vaccinationEvent.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.description && { description: data.description }),
                ...(data.scheduledAt && {
                    scheduledAt: DateHelper.parseDateStringToDate(data.scheduledAt),
                }),
                updatedBy: reqUser.id,
            },
        });

        if (data.targetType) {
            // Xóa tất cả target cũ
            await this.prisma.vaccinationTarget.deleteMany({
                where: { vaccinationEventID: id },
            });

            if (data.targetType === VaccinationTargetType.SCHOOL) {
                await this.prisma.vaccinationTarget.create({
                    data: {
                        vaccinationEventID: id,
                        targetType: VaccinationTargetType.SCHOOL,
                        targetID: 0,
                    },
                });
            } else if (
                (data.targetType === VaccinationTargetType.GRADE ||
                    data.targetType === VaccinationTargetType.CLASS) &&
                Array.isArray(data.targetIds) &&
                data.targetIds.length > 0
            ) {
                const targetsToCreate = data.targetIds.map((targetID) => ({
                    vaccinationEventID: id,
                    targetType: data.targetType!,
                    targetID,
                }));

                await this.prisma.vaccinationTarget.createMany({
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
        return successResponse(200, 'Cập nhật tiêm chủng  thành công')

    }
}