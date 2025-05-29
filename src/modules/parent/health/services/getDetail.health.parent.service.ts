import { Allergies, ChronicDiseases } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";



@Injectable()
export class GetDetailHealthParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getDetail(studentID: number, reqUser) {
        try {
            const parent = await this.prisma.parent.findUnique({
                where: { accountID: reqUser.id },
            });

            if (!parent) return errorResponse(400, 'Không tìm thấy phụ huynh')

            const student = await this.prisma.student.findFirst({
                where: {
                    id: studentID,
                    parentId: parent.id,
                },
            });

            if (!student) return errorResponse(400, 'Không có quyền truy cập học sinh này');

            const healthProfileDetail = await this.prisma.student.findUnique({
                where: {
                    id: studentID,
                    healthProfile: {
                        isNot: null
                    }
                },
                select: {
                    student_code: true,
                    dateOfBirth: true,
                    gender: true,
                    graduated: true,
                    account: {
                        select: {
                            id: true,
                            fullname: true,
                            email: true
                        }
                    },
                    classAssignments: {
                        select: {
                            class: {
                                select: {
                                    name: true,
                                    grade: true
                                }
                            },
                            academicYear: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    },
                    healthProfile: {
                        select: {
                            id: true,
                            height: true,
                            weight: true,
                            bloodGroup: true,
                            treatmentHistory: true,
                            additionalNote: true,
                            hasNoAllergies: true,
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
                            detailAllergies: true,
                            methodAllergies: true,
                            hasNochronicDiseases: true,
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
                            healthVaccination: {
                                select: {
                                    vaccination: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            },
                            vaccinationHistory: true,
                            sideEffect: true,
                            DetailSideEffect: true,
                        }
                    }

                }
            })
            return successResponse(200, healthProfileDetail, 'Lấy thông tin chi tiết hồ sơ học sinh thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy thông tin chi tiết hồ sơ học sinh thất bại')
        }

    }
}