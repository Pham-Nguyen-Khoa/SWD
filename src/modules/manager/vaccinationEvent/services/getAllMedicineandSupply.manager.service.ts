import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetAllMedicineAndSupplyManagerService {
    constructor(private readonly prisma: PrismaService) { }
    async getAll() {
        const medicineEntities: any = await this.prisma.medicine.findMany({
            select: {
                id: true,
                image: true,
                name: true,
                stock: true,
            }
        });
        const medicineSupplyEntities = await this.prisma.medicineSupply.findMany({
            select: {
                id: true,
                image: true,
                name: true,
                stock: true,
            }
        })
        const updatedMedicineEntities = medicineEntities.map((medicine: any) => {
            return {
                ...medicine,
                type: "medicine"
            };
        });
        const updatedMedicineSupplyEntities = medicineSupplyEntities.map((medicine: any) => {
            return {
                ...medicine,
                type: "supply"
            };
        });
        const result = [
            ...updatedMedicineEntities,
            ...updatedMedicineSupplyEntities
        ]
        return result
    }
}