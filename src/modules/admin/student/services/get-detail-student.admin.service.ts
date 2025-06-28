import { Injectable } from "@nestjs/common";
import { errorResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllStudentAdminService } from "./getAll-student.admin.service";



@Injectable()
export class GetDetailStudentAdminService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getAllStudentService: GetAllStudentAdminService
    ) { }
    async getDetail(id: number) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            select: {
                id: true,
                student_code: true,
                dateOfBirth: true,
                gender: true,
                graduated: true,
                account: {
                    select: {
                        fullname: true,
                        email: true,
                        roleID: true
                    }
                }
            }
        })
        if (!student) {
            return errorResponse(400, 'Học sinh có id ${id} không tồn tại')
        }
        const studentDetail = await this.getAllStudentService.getAll({ search: student.account.email })


        // Lịch sử checkUp
        const healthCheckUpHistory = await this.prisma.healthCheckup.findMany({
            where: {
                HealthCheckupResponse: {
                    some: {
                        studentID: id,
                        status: "ACCEPTED"
                    }
                }
            },
            orderBy: {
                scheduledAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                scheduledAt: true,
                HealthCheckupResult: {
                    where: { studentID: id },
                    select: {
                        status: true,
                        overallNotes: true,
                        overallResult: true,
                        createdAt: true,
                    },
                },
                HealthCheckupContent: {
                    select: {
                        id: true,
                        name: true,
                        HealthCheckupContentResult: {
                            where: { studentID: id },
                            select: {
                                value: true,
                                note: true,
                            },
                        },
                    },
                },
            }

        })

        const healthCheckupHistoryFormat = healthCheckUpHistory.map(checkup => ({
            checkupID: checkup.id,
            title: checkup.title,
            scheduledAt: checkup.scheduledAt,
            result: checkup.HealthCheckupResult[0] || null,
            contents: checkup.HealthCheckupContent.map(c => ({
                name: c.name,
                value: c.HealthCheckupContentResult[0]?.value || null,
                note: c.HealthCheckupContentResult[0]?.note || null,
            })),
        }));

        // Lịch sử Tiêm chủng
        const vaccinationEventHistory = await this.prisma.vaccinationEvent.findMany({
            where: {
                vaccinationResponse: {
                    some: {
                        studentID: id,
                        status: "ACCEPTED"
                    }
                }
            },
            orderBy: {
                scheduledAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                scheduledAt: true,
                vaccinationResult: {
                    where: { studentID: id },
                    select: {
                        status: true,
                        result: true,
                        note: true,
                        createdAt: true,
                    },
                },
            }

        })

        const vaccinationEventHistoryFormat = vaccinationEventHistory.map(vaccination => ({
            vaccinationEventID: vaccination.id,
            title: vaccination.name,
            scheduledAt: vaccination.scheduledAt,
            result: vaccination.vaccinationResult[0] || null,
        }));

        // Lịch sử sự kiện y tế

        const medicalEventHistoty = await this.prisma.medicalEvent.findMany({
            where: {
                status: "COMPLETED",
                studentID: id
            },
            select: {
                type: true,
                occurredAt: true,
                description: true,
                status: true,
                severity: true,
                HospitalTransfer: {
                    select: {
                        hospitalName: true,
                        transferredAt: true
                    }
                }
            }
        })



        const data = {
            ...student,
            ParentInfo: studentDetail.result[0].ParentInfo,
            lastAcamedicYear: studentDetail.result[0].lastAcamedicYear,
            healthCheckupHistoryFormat,
            vaccinationEventHistoryFormat,
            medicalEventHistoty
        }

        return data



    }
}