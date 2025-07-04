import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { format } from "date-fns"
import { GetDashboardMedicalEventQuery } from "../dtos/medicalEvent.dashboard.admin.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";

@Injectable()

export class HealthProfileDashBoardAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async healthProfileDashboard() {
        try {
            const healthProfiles = await this.prisma.healthProfile.findMany({
                select: {
                    student: true,
                    healthAllergies: {
                        select: {
                            allergies: true
                        }
                    },
                    healthChronicDiseases: {
                        select: {
                            chronicDiseases: true
                        }
                    },
                    healthVaccination: {
                        select: {
                            vaccination: true
                        }
                    }
                }
            })
            const totalStudents = await this.prisma.student.count();
            const studentNotHealthProfile = totalStudents - healthProfiles.length;
            const percentProfileCompleted = Math.round((healthProfiles.length / totalStudents) * 100);

            const studentsWithProfileIDs = new Set(healthProfiles.map(p => p.student.id));
            const studentsWithoutProfile = await this.prisma.student.findMany({
                where: {
                    id: { notIn: Array.from(studentsWithProfileIDs) }
                },
                select: {
                    id: true,
                    student_code: true,
                    gender: true,
                    account: {
                        select: {
                            fullname: true,
                        }
                    },
                    classAssignments: {
                        select: {
                            class: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });


            const allergyMap: Record<string, Set<number>> = {};

            for (const profile of healthProfiles) {
                for (const allergy of profile.healthAllergies) {
                    if (!allergyMap[allergy.allergies.name]) {
                        allergyMap[allergy.allergies.name] = new Set();
                    }
                    allergyMap[allergy.allergies.name].add(profile.student.id);
                }
            }

            const allergyStats = Object.entries(allergyMap).map(([allergy, studentSet]) => ({
                allergy,
                count: studentSet.size
            }));



            const chronicMap: Record<string, Set<number>> = {};

            for (const profile of healthProfiles) {
                for (const disease of profile.healthChronicDiseases) {
                    if (!chronicMap[disease.chronicDiseases.name]) {
                        chronicMap[disease.chronicDiseases.name] = new Set();
                    }
                    chronicMap[disease.chronicDiseases.name].add(profile.student.id);
                }
            }

            const chronicStats = Object.entries(chronicMap).map(([disease, studentSet]) => ({
                disease,
                count: studentSet.size
            }));



            const vaccineMap: Record<string, Set<number>> = {};

            for (const profile of healthProfiles) {
                for (const disease of profile.healthVaccination) {
                    if (!vaccineMap[disease.vaccination.name]) {
                        vaccineMap[disease.vaccination.name] = new Set();
                    }
                    vaccineMap[disease.vaccination.name].add(profile.student.id);
                }
            }

            const vaccineStats = Object.entries(vaccineMap).map(([vaccine, studentSet]) => ({
                vaccine,
                count: studentSet.size
            }));
            const topCommonAllergies = allergyStats
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
            const topCommonChronic = chronicStats
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
            const topCommonVaccine = vaccineStats
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            const result = {
                totalStudents,
                totalHealthProfile: healthProfiles.length,
                percentProfileCompleted,
                studentsWithoutProfile,
                studentNotHealthProfile,
                allergyStats,
                topCommonAllergies,
                chronicStats,
                topCommonChronic,
                vaccineStats,
                topCommonVaccine
            }
            return successResponse(200, result, 'Lấy thống kê hồ sơ sức khỏe thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Lấy thống kê hồ sơ sức khỏe thất bại')

        }
    }
}