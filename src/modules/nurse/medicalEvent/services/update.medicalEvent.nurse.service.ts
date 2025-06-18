import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { UpdateMedicalEventNurseDTO } from "../dtos/update.medicalEvent.nurse.dto";
import { CreateTreatmentDTO } from "../dtos/create.treatment.nurse.dto";


@Injectable()
export class UpdateMedicalEventNurseService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async update(id: number, data: UpdateMedicalEventNurseDTO, reqUser) {
        // Kiểm tra xem id có tồn tại 
        const medicalEvent = await this.prisma.medicalEvent.findUnique({
            where: { id }
        })
        if (!medicalEvent) {
            return errorResponse(400, 'ID sự kiện y tế không tồn tại')
        }
        if (medicalEvent.status === "PENDING" && Array.isArray(data.items) && data.items.length > 0) {
            return errorResponse(400, 'Chưa có dữ liệu để cập nhật')
        }
        try {
            await this.prisma.medicalEvent.update({
                where: { id },
                data: {
                    type: data.type,
                    occurredAt: new Date(data.occurredAt),
                    description: data.description,
                    updatedBy: reqUser.id
                }
            })
            if (data.hospitalName && data.transferredAt && (medicalEvent.status === "HOSPITALIZED" || medicalEvent.status === "HOSPITALDISCHARGE")) {
                await this.prisma.hospitalTransfer.update({
                    where: {
                        medicalEventID: id
                    },
                    data: {
                        hospitalName: data.hospitalName,
                        transferredAt: new Date(data.transferredAt),
                        updatedBy: reqUser.id
                    }
                })
            }
            if (medicalEvent.status === "PROCESSING") {
                const treatmentEntity = await this.prisma.treatment.findMany({
                    where: {
                        medicalEventID: id
                    },
                    select: {
                        id: true,
                        medicalEventID: true,
                        medicineID: true,
                    }
                })
                const update = await this.updateTreatments(id, data.items)
            }
            return successResponse(200, 'Cập nhật sự kiện y tế thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Cập nhật sự kiện y tế thất bại')
        }


    }

    async updateTreatments(medicalEventID: number, newList: any) {
        const oldList = await this.prisma.treatment.findMany({
            where: { medicalEventID },
        });

        const updates: { id: number, data: any }[] = [];
        const creates: any[] = [];
        const usedIds = new Set<number>();

        for (const item of newList) {
            const matched = oldList.find(
                t =>
                    t.medicineID === (item.medicineID ?? null) &&
                    t.medicineSupplyID === (item.medicineSupplyID ?? null)
            );

            if (matched) {
                usedIds.add(matched.id);

                // Nếu khác quantity hoặc dosage → cập nhật
                if (matched.quantity !== item.quantity || matched.dosage !== item.dosage) {
                    updates.push({
                        id: matched.id,
                        data: {
                            quantity: item.quantity,
                            dosage: item.dosage,
                        },
                    });
                }

                // Nếu giống thì bỏ qua
            } else {
                // Tạo mới
                creates.push({
                    medicalEventID,
                    quantity: item.quantity,
                    dosage: item.dosage,
                    medicineID: item.medicineID ?? null,
                    medicineSupplyID: item.medicineSupplyID ?? null,
                });
            }
        }

        // Xoá các bản ghi không còn dùng
        const toDeleteIds = oldList.filter(t => !usedIds.has(t.id)).map(t => t.id);

        if (toDeleteIds.length) {
            await this.prisma.treatment.deleteMany({ where: { id: { in: toDeleteIds } } });
        }

        for (const u of updates) {
            await this.prisma.treatment.update({ where: { id: u.id }, data: u.data });
        }

        if (creates.length) {
            await this.prisma.treatment.createMany({ data: creates });
        }

        return {
            updated: updates.length,
            created: creates.length,
            deleted: toDeleteIds.length,
        };
    }

}