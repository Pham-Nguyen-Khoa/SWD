import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateVaccinationEventDTO } from "../dtos/create.vaccinationEvent.manager.dto";
import { DateHelper } from "src/helpers/date.helper";
import { errorResponse, successResponse } from "src/common/utils/response.util";

enum VaccinationTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS'
}

@Injectable()
export class CreateVaccinationEventManagerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(data: CreateVaccinationEventDTO, reqUser) {
        // Lấy academicID mới nhất 
        const academicYear = await this.prisma.academicYear.findFirst({
            orderBy: {
                startDate: 'desc'
            }
        })
        if (!academicYear) {
            return errorResponse(400, 'Không có năm học nào tồn tại')
        }
        const newDate = DateHelper.parseDateStringToDate(data.scheduledAt);
        const now = new Date();

        // So sánh ngày phải >= 5 ngày sau thời điểm hiện tại
        const minDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 ngày sau
        if (newDate < minDate) {
            return errorResponse(400, 'Ngày tiêm chủng phải cách hiện tại ít nhất 5 ngày');
        }

        const vaccinationEvent = await this.prisma.vaccinationEvent.create({
            data: {
                name: data.name,
                description: data.description,
                scheduledAt: DateHelper.parseDateStringToDate(data.scheduledAt),
                academicYearID: academicYear.id,
                createdBy: reqUser.id
            }
        })
        if (data.targetType === VaccinationTargetType.SCHOOL) {
            await this.prisma.vaccinationTarget.create({
                data: {
                    vaccinationEventID: vaccinationEvent.id,
                    targetType: VaccinationTargetType.SCHOOL,
                    targetID: 0
                }
            })
        } else if (
            (data.targetType === VaccinationTargetType.GRADE || data.targetType === VaccinationTargetType.CLASS) &&
            Array.isArray(data.targetIds) && data.targetIds.length > 0
        ) {
            const targetsToCreate = data.targetIds.map((id: number) => ({
                vaccinationEventID: vaccinationEvent.id,
                targetType: data.targetType,
                targetID: id
            }));

            await this.prisma.vaccinationTarget.createMany({
                data: targetsToCreate,
                skipDuplicates: true
            });
        } else {
            return errorResponse(400, 'Loại mục tiêu không hợp lệ hoặc thiếu danh sách targetIds.');
        }
        return successResponse(200, 'Tạo tiêm chủng mới thành công')
    }
}