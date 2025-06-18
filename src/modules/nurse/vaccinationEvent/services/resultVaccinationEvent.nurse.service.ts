import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { ResultVaccinationEventNurseDto, VaccinationResultDto } from "../dtos/resultVaccinationEvent.nurse.dto";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class ResultVaccinationEventNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async result(id: number, data: ResultVaccinationEventNurseDto, reqUser) {
        const [vaccinationEventEntity, vaccinationResult] = await Promise.all([
            await this.prisma.vaccinationEvent.findUnique({
                where: { id },
            }),
            await this.prisma.vaccinationResult.findFirst({
                where: {
                    vaccinationEventID: id
                }
            })
        ])

        if (!vaccinationEventEntity) {
            return errorResponse(400, 'Không tìm thấy cuộc tiêm chủng nào nó id này');
        }
        // const nowTime = new Date();
        // if (nowTime < vaccinationEventEntity.scheduledAt) {
        //     return errorResponse(400, 'Chưa đến thời gian tiêm chủng, không thể ghi nhận kết quả.');
        // }
        if (vaccinationResult) {
            return errorResponse(400, 'Đã có kết quả ghi nhận cho cuộc tiêm chủng này')
        }
        if (vaccinationEventEntity.status === "SUCCESSED") {
            return errorResponse(400, 'Cuộc tiêm chủng này hoàn tất')
        }


        const result = data.result;
        const totalStudentSuccess = result.filter(res => res.status === "SUCCESS").length;
        await this.prisma.vaccineEventStock.updateMany({
            where: {
                vaccinationEventID: id
            },
            data: {
                quantityUsed: totalStudentSuccess
            }
        })
        const vacccineEventStock = await this.prisma.vaccineEventStock.findMany({
            where: { vaccinationEventID: id }
        })
        // Cập nhật số lượng thuốc trong kho 
        for (const item of vacccineEventStock) {
            const quantityUsed = item.quantityUsed || 0;

            // Nếu là thuốc
            if (item.medicineID) {
                await this.prisma.medicine.update({
                    where: { id: item.medicineID },
                    data: {
                        stock: {
                            decrement: quantityUsed,
                        },
                    },
                });
            }

            // Nếu là vật tư
            if (item.medicineSupplyID) {
                await this.prisma.medicineSupply.update({
                    where: { id: item.medicineSupplyID },
                    data: {
                        stock: {
                            decrement: quantityUsed,
                        },
                    },
                });
            }
        }
        const vaccinationResults = result.map((res) => ({
            vaccinationEventID: id,
            studentID: res.studentID,
            status: res.status,
            result: res.result,
            note: res.note,
            createdBy: reqUser.id

        }))
        await this.prisma.vaccinationResult.createMany({
            data: vaccinationResults,
        })
        return successResponse(200, 'Ghi nhận kết quả tiêm chủng thành công')

    }
}