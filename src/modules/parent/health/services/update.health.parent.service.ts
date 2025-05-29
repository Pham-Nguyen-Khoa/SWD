import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateHealthProfileDTO } from "../dtos/update.health.parent.dto";


@Injectable()
export class UpdateHealthProfileParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async update(id: number, data: UpdateHealthProfileDTO, reqUser) {
        const {
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
        // kiểm tra hồ sơ tồn tại 
        const healthProfile = await this.prisma.healthProfile.findFirst({
            where: {
                id,
                student: {
                    is: {
                        Parent: {
                            is: {
                                accountID: reqUser.id
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                student: {
                    select: {
                        account: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                }
            }
        });
        if (!healthProfile) {
            return errorResponse(400, 'Không tìm thấy hồ sơ học sinh này của phụ huynh')
        }
        // Update 
        let updatedData = {
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
            updatedBy: reqUser.id

        }
        if (selectedAllergyIds.length > 0 || detailAllergies != "") {
            updatedData.hasNoAllergies = false
        }
        if (selectedChronicDiseases.length > 0 || detailChronicDiseases != "") {
            updatedData.hasNochronicDiseases = false
        }
        const updateHealthProfile = await this.prisma.healthProfile.update({
            where: { id: healthProfile.id },
            data: updatedData
        })
        // Cập nhật lại Dị ứng Allergies 
        const currentAllergies = await this.prisma.healthAllergies.findMany({
            where: { healthProfileID: healthProfile.id },
            select: { allergiesID: true }
        })
        const currentAllergiesID = currentAllergies.map((a) => a.allergiesID);

        const toDeleteAllergiesID = currentAllergiesID.filter(id => !selectedAllergyIds.includes(id));
        const toAddAllergiesID = selectedAllergyIds.filter(id => !currentAllergiesID.includes(id))
        // Xóa những cái cũ mà cập nhật không có
        await this.prisma.healthAllergies.deleteMany({
            where: {
                healthProfileID: healthProfile.id,
                allergiesID: { in: toDeleteAllergiesID }
            }
        })
        // Thêm những cái mới
        await this.prisma.healthAllergies.createMany({
            data: toAddAllergiesID.map(id => ({
                healthProfileID: healthProfile.id,
                allergiesID: id
            })),
            skipDuplicates: true
        })



        // Cập nhật lại Bệnh mãng tính ChronicDiseases 
        const currentChronicDiseases = await this.prisma.healthChronicDiseases.findMany({
            where: { healthProfileID: healthProfile.id },
            select: { chronicDiseasesID: true }
        })
        const currentChronicDiseasesID = currentChronicDiseases.map((a) => a.chronicDiseasesID);

        const toDeleteChronicDiseasesID = currentChronicDiseasesID.filter(id => !selectedAllergyIds.includes(id));
        const toAddChronicDiseasesID = selectedChronicDiseases.filter(id => !currentChronicDiseasesID.includes(id))
        // Xóa những cái cũ mà cập nhật không có
        await this.prisma.healthChronicDiseases.deleteMany({
            where: {
                healthProfileID: healthProfile.id,
                chronicDiseasesID: { in: toDeleteChronicDiseasesID }
            }
        })
        // Thêm những cái mới
        await this.prisma.healthChronicDiseases.createMany({
            data: toAddChronicDiseasesID.map(id => ({
                healthProfileID: healthProfile.id,
                chronicDiseasesID: id
            })),
            skipDuplicates: true
        })


        // Cập nhật lại Bệnh mãng tính ChronicDiseases 
        const currentVaccination = await this.prisma.healthVaccination.findMany({
            where: { healthProfileID: healthProfile.id },
            select: { vaccinationID: true }
        })
        const currentVaccinationID = currentVaccination.map((a) => a.vaccinationID);

        const toDeleteVaccinationID = currentVaccinationID.filter(id => !selectedVaccinations.includes(id));
        const toAddVaccinationID = selectedVaccinations.filter(id => !currentVaccinationID.includes(id))
        // Xóa những cái cũ mà cập nhật không có
        await this.prisma.healthVaccination.deleteMany({
            where: {
                healthProfileID: healthProfile.id,
                vaccinationID: { in: toDeleteVaccinationID }
            }
        })
        // Thêm những cái mới
        await this.prisma.healthVaccination.createMany({
            data: toAddVaccinationID.map(id => ({
                healthProfileID: healthProfile.id,
                vaccinationID: id
            })),
            skipDuplicates: true
        })



        return successResponse(200, data, `Update thông tin hồ sơ y tế  học sinh ${healthProfile.student.account.fullname}`)
    }
}