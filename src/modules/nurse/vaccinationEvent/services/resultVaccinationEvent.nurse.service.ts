import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { ResultVaccinationEventNurseDto } from "../dtos/resultVaccinationEvent.nurse.dto";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class ResultVaccinationEventNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async result(id: number, data: ResultVaccinationEventNurseDto, reqUser) {
        try {
            const [vaccinationEventEntity, vaccinationResult] = await Promise.all([
                await this.prisma.vaccinationEvent.findUnique({
                    where: { id }
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
            const nowTime = new Date();
            if (nowTime < vaccinationEventEntity.scheduledAt) {
                return errorResponse(400, 'Chưa đến thời gian tiêm chủng, không thể ghi nhận kết quả.');
            }
            if (vaccinationResult) {
                return errorResponse(400, 'Đã có kết quả ghi nhận cho cuộc tiêm chủng này')
            }


            const result = data.result;
            console.log(result)
            // console.log(reqUser.id)
            const vaccinationResults = result.map((res) => ({
                vaccinationEventID: id,
                studentID: res.studentID,
                status: res.status,
                result: res.result,
                note: res.note,
                respondedAt: new Date(),
                createdBy: reqUser.id

            }))
            await this.prisma.vaccinationResult.createMany({
                data: vaccinationResults,
            })
            return successResponse(200, 'Ghi nhận kết quả tiêm chủng thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Ghi nhận kết quả tiêm chủng thất bại')
        }
    }
}