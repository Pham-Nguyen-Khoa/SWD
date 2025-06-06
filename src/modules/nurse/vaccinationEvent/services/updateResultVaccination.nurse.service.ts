import { Injectable } from "@nestjs/common";
import { ResultVaccinationEventNurseDto } from "../dtos/resultVaccinationEvent.nurse.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class UpdateResultVaccinationNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async update(id: number, data: ResultVaccinationEventNurseDto, reqUser) {
        const [vaccinationEvent, vaccinationResult] = await Promise.all([
            this.prisma.vaccinationEvent.findUnique({
                where: {
                    id
                }
            }),
            this.prisma.vaccinationResult.findMany({
                where: {
                    vaccinationEventID: id
                }
            })
        ])
        if (!vaccinationEvent) {
            return errorResponse(400, `Không tìm thấy cuộc tiêm chủng nào có id ${id}`)
        } else if (vaccinationResult.length === 0) {
            return errorResponse(400, `Cuộc tiêm chủng này chưa hề có kết quả ghi nhận `)
        }
        // if (vaccinationEvent.status === "CANCELED") {
        //     return errorResponse(400, 'Cuộc tiêm chủng này đã bị hủy bỏ')
        // }
        if (vaccinationEvent.status === "SUCCESSED") {
            return errorResponse(400, 'Cuộc tiêm chủng này hoàn tất')
        }
        const result = data.result;
        await Promise.all(result.map(res => {
            return this.prisma.vaccinationResult.update({
                where: {
                    vaccinationEventID_studentID: {
                        vaccinationEventID: id,
                        studentID: res.studentID,
                    }
                },
                data: {
                    status: res.status,
                    note: res.note,
                    result: res.result,
                    updatedBy: reqUser.id
                }
            })
        }))
        return successResponse(200, 'Cập nhật kết quả cuộc tiêm chủng thành công')

    }
}