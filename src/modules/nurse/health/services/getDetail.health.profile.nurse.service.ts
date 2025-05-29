import { Injectable } from "@nestjs/common";
import { errorResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetDetailHealthProfileNurseService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetail(healthProfileID: number) {
        // check id hồ sơ hợp lệ 
        const healthProfileExist = await this.prisma.healthProfile.findUnique({
            where: { id: healthProfileID }
        })
        if (!healthProfileExist) {
            return errorResponse(400, `Không có hồ sơ y tế nào có id ${healthProfileID} tồn tại trong hệ thống `)
        }
        const healthProfile = await this.prisma.healthProfile.findMany({
            where: { id: healthProfileID },
            select: {
                id: true,
                height: true,
                weight: true,
                bloodGroup: true,
                treatmentHistory: true,
                additionalNote: true,
                hasNoAllergies: true,
                detailAllergies: true,
                methodAllergies: true,
                hasNochronicDiseases: true,
                detailChronicDiseases: true,
                methodChronicDiseases: true,
                medicationNote: true,
                visionLeft: true,
                visionRight: true,
                wearGlasses: true,
                noteVision: true,
                hearingLeft: true,
                hearingRight: true,
                hearingAid: true,
                noteHearing: true,
                vaccinationHistory: true,
                sideEffect: true,
                DetailSideEffect: true,
                student: {
                    select: {
                        id: true,
                        student_code: true,
                        dateOfBirth: true,
                        gender: true,
                        ParentInfo: {
                            select: {
                                fullname: true,
                                email: true,
                                phone: true
                            }
                        },
                        account: {
                            select: {
                                fullname: true,
                                email: true,
                            }
                        },
                        classAssignments: {
                            select: {
                                class: {
                                    select: {
                                        name: true
                                    }
                                },
                            }
                        }
                    }
                },
                healthAllergies: {
                    select: {
                        allergies: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                healthChronicDiseases: {
                    select: {
                        chronicDiseases: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                healthVaccination: {
                    select: {
                        vaccination: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return healthProfile
    }
}