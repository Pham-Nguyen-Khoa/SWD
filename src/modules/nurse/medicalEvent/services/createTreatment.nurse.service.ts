import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateMedicalEventNurseDTO } from "../dtos/create.medicalEvent.nurse.dto";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { MailService } from "src/modules/common/mail/mail.service";
import { DateHelper } from "src/helpers/date.helper";
import { CreateTreatmentDTO } from "../dtos/create.treatment.nurse.dto";


@Injectable()

export class CreateTreatmentNurseService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async create(id: number, data: CreateTreatmentDTO, reqUser) {
        // Kiểm tra xem id có tồn tại 
        const medicalEventEntity = await this.prisma.medicalEvent.findUnique({
            where: { id },
            select: { id: true, status: true }
        })
        if (!medicalEventEntity) {
            return errorResponse(400, 'ID sự kiện y tế không tồn tại')
        }
        const medicalEventID = medicalEventEntity.id;
        if (medicalEventEntity.status !== "PENDING") {
            return errorResponse(400, 'Sự kiện này không thể tạo hành động')
        }
        // Kiểm tra xem đã tạo hành động chưa 
        const treatmentEntity = await this.prisma.treatment.findFirst({
            where: {
                medicalEventID
            }
        })
        if (treatmentEntity) {
            return errorResponse(400, 'Đã tạo hành động')
        }
        // Cập nhật số lượng thuốc trong kho 
        for (const item of data.items) {
            // Nếu là thuốc
            if (item.medicineID) {
                await this.prisma.medicine.update({
                    where: { id: item.medicineID },
                    data: {
                        stock: {
                            decrement: item.quantity,
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
                            decrement: item.quantity,
                        },
                    },
                });
            }
        }
        const treatmentData = data.items.map((treatment) => ({
            medicalEventID,
            medicineID: treatment.medicineID,
            medicineSupplyID: treatment.medicineSupplyID,
            quantity: treatment.quantity,
            dosage: treatment.dosage,
            createdBy: reqUser.id
        }))
        try {
            await this.prisma.$transaction([
                this.prisma.treatment.createMany({
                    data: treatmentData
                }),
                this.prisma.medicalEvent.update({
                    where: {
                        id
                    },
                    data: {
                        status: "PROCESSING"
                    }
                })
            ])
            return successResponse(200, 'Đã xử lý sự kiện xong')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Xử lý sự kiện thất bại')
        }
    }
}