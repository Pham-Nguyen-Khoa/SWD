import { IsBoolean } from 'class-validator';
import { Injectable } from "@nestjs/common";
import { CreateHealthProfileDTO } from "../dtos/create.health.parent.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";


@Injectable()
export class CreateHealthProfileParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(data: CreateHealthProfileDTO, reqUser) {
        try {
            console.log(data)
            // let {
            //     studentID,
            //     selectedAllergyIds,
            //     customAllergies,
            //     hasNoAllergies,
            //     selectedChronicDiseases,
            //     customchronicDiseases,
            //     hasNochronicDiseases,
            //     treatmentHistory,
            //     vision,
            //     hearing,
            //     medicationNote,
            //     physicalCondition,
            //     additionalNote,
            //     selectedVaccinations
            // } = data;
            const {
                studentID,
                height,
                weight,
                bloodGroup,
                treatmentHistory,
                additionalNote,
                hasNoAllergies,
                selectedAllergyIds,
                detailAllergies,
                methodAllergies,
                hasNochronicDiseases,
                selectedChronicDiseases,
                detailChronicDiseases,
                methodChronicDiseases,
                medicationNote,
                visionLeft,
                visionRight,
                wearGlasses,
                noteVision,
                hearingLeft,
                hearingRight,
                hearingAid,
                noteHearing,
                selectedVaccinations,
                vaccinationHistory,
                sideEffect,
                DetailSideEffect,
            } = data
            // Check coi học sinh này phải con của phụ huynh không và  Check coi học sinh đã có hồ sơ chưa 
            const parentEntity = await this.prisma.parent.findUnique({
                where: {
                    accountID: reqUser.id
                },
                select: {
                    id: true
                }
            })
            const [studentExist, healthProfileEntity] = await Promise.all([
                await this.prisma.student.findUnique({
                    where: {
                        id: parseInt(studentID),
                        parentId: parentEntity?.id
                    },
                    include: {
                        account: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                }),
                await this.prisma.healthProfile.findUnique({
                    where: {
                        studentID: parseInt(studentID)
                    }
                })
            ])
            if (!studentExist) {
                return errorResponse(200, 'Học sinh này không phải con của phụ huynh ')
            }
            if (healthProfileEntity) {
                return errorResponse(200, `Hồ sơ của học sinh ${studentExist.account.fullname} đã tồn tại`)
            }

            // Tạo Health Profile 

            let createdData = {
                studentID: parseInt(studentID),
                height,
                weight,
                bloodGroup,
                treatmentHistory,
                additionalNote,
                hasNoAllergies,
                // selectedAllergyIds,
                detailAllergies,
                methodAllergies,
                hasNochronicDiseases,
                // selectedChronicDiseases,
                detailChronicDiseases,
                methodChronicDiseases,
                medicationNote,
                visionLeft,
                visionRight,
                wearGlasses,
                noteVision,
                hearingLeft,
                hearingRight,
                hearingAid,
                noteHearing,
                // selectedVaccinations,
                vaccinationHistory,
                sideEffect,
                DetailSideEffect,
                createdBy: reqUser.id

            }
            if (selectedAllergyIds.length > 0 || detailAllergies != "") {
                createdData.hasNoAllergies = false
            }
            if (selectedChronicDiseases.length > 0 || detailChronicDiseases != "") {
                createdData.hasNochronicDiseases = false
            }
            const healthProfile = await this.prisma.$transaction(async (tx) => {
                // Tạo hồ sơ sức khỏe
                const createdProfile = await tx.healthProfile.create({
                    data: createdData
                });
                // Nếu có dị ứng chọn từ danh sách có sẵn
                if (selectedAllergyIds && selectedAllergyIds.length > 0) {
                    const allergyRecords = selectedAllergyIds.map((allergiesID) => ({
                        healthProfileID: createdProfile.id,
                        allergiesID,
                    }));

                    await tx.healthAllergies.createMany({
                        data: allergyRecords,
                    });
                }
                if (selectedChronicDiseases && selectedChronicDiseases.length > 0) {
                    const chronicDiseasesRecords = selectedChronicDiseases.map((chronicDiseasesID) => ({
                        healthProfileID: createdProfile.id,
                        chronicDiseasesID: chronicDiseasesID

                    }));

                    await tx.healthChronicDiseases.createMany({
                        data: chronicDiseasesRecords,
                    });
                }
                if (selectedVaccinations && selectedVaccinations.length > 0) {
                    const healthVaccinationsRecords = selectedVaccinations.map((vaccinationID) => ({
                        healthProfileID: createdProfile.id,
                        vaccinationID
                    }))
                    await tx.healthVaccination.createMany({
                        data: healthVaccinationsRecords
                    })
                }
                return createdProfile;
            });


            return successResponse(200, healthProfile, 'Tạo hồ sơ y tế học sinh thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Tạo hồ sơ y tế học sinh thành công')

        }
    }
}