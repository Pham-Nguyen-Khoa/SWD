import { Allergies, ChronicDiseases } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";



@Injectable()
export class FormDataHealthParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async formData() {
        try {
            const data = await Promise.all([
                await this.prisma.allergies.findMany(),
                await this.prisma.chronicDiseases.findMany(),
                await this.prisma.vaccination.findMany(),
            ])
            const result = {
                Allergies: data[0],
                ChronicDiseases: data[1],
                Vaccination: data[2],

            }
            return successResponse(200, result, "Lấy thông tin thành công")
        } catch (error) {
            console.log(error)
            return errorResponse(400, "Lấy thông tin thất bại")

        }
    }
}