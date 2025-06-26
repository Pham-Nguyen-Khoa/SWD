import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { CreateHealthCheckupDTO } from "../dtos/create.checkUp.manager.dto";
import { DateHelper } from "src/helpers/date.helper";
enum HealthCheckupTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS',
}
@Injectable()
export class CreateCheckUpManagerService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async create(data: CreateHealthCheckupDTO, reqUser) {
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
        // // check ton tai chua
        const checkUpEntity = await this.prisma.healthCheckup.findFirst({
            where: {
                academicYearID: academicYear.id,
                title: data.title
            }
        })
        if (checkUpEntity) {
            return errorResponse(400, 'Cuộc kiểm tra sức khỏe định kỳ đã tồn tại');
        }
        const createData = {
            academicYearID: academicYear.id,
            title: data.title,
            description: data.description,
            scheduledAt: new Date(data.scheduledAt),
            createdBy: reqUser.id,
            HealthCheckupTarget: {
                create:
                    data.targetType === HealthCheckupTargetType.SCHOOL
                        ? [{ targetType: data.targetType, targetID: 0 }]
                        : (data.targetIds || []).map(id => ({
                            targetType: data.targetType,
                            targetID: id
                        }))
            },
            HealthCheckupStock: {
                create: data.items.map(item => ({
                    medicineID: item.medicineID,
                    medicineSupplyID: item.medicineSupplyID,
                    quantityPlanned: item.quantityPlanned,
                    quantityUsed: 0,
                    notes: item.notes,
                }))
            },
            HealthCheckupContent: {
                create: data.checkupContents.map((item) => ({
                    name: item.name,
                    description: item.description,
                    inputType: item.inputType
                }))
            }
        }
        await this.prisma.healthCheckup.create({
            data: createData
        })

        return successResponse(200, 'Tạo cuộc sức khỏe định kỳ thành công')
    }

}