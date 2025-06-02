import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { ResultVaccinationEventNurseDto } from "../dtos/resultVaccinationEvent.nurse.dto";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class GetDetailResultVaccinationEventNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetail(id: number) {
        try {
            const academicYear = await this.prisma.academicYear.findFirst({ orderBy: { startDate: "desc" } })
            const vaccinationEventResultEntity = await this.prisma.vaccinationResult.findMany({
                where: {
                    vaccinationEventID: id,

                },
                include: {
                    student: {
                        select: {
                            account: {
                                select: {
                                    fullname: true,
                                    email: true
                                }
                            },
                            ParentInfo: {
                                select: {
                                    fullname: true,
                                }
                            },
                            classAssignments: {
                                where: {
                                    academicYearID: academicYear?.id
                                },
                                select: {
                                    class: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            if (vaccinationEventResultEntity.length === 0) {
                return errorResponse(400, `Chưa có kết quả cho cuộc tiêm này`)
            }
            return successResponse(200, vaccinationEventResultEntity, 'Lấy kết quả của cuộc tiêm chủng thành công')
        } catch (error) {
            return errorResponse(400, 'Lấy kết quả của cuộc tiêm chủng thất bại')

        }
    }
}