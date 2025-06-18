import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateMedicineRequestDto } from "../dtos/create.medicineRequest.parent.dto";
import { DateHelper } from "src/helpers/date.helper";



@Injectable()

export class CreateMedicineRequestParentService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(data: CreateMedicineRequestDto, reqUser) {
        const parentInfo = await this.prisma.parent.findFirst({
            where: {
                accountID: reqUser.id
            },
            select: {
                id: true,
            }
        })
        const checkStudentOfParent = await this.prisma.student.findFirst({
            where: {
                id: data.studentID,
                parentId: parentInfo?.id
            }
        })
        if (!checkStudentOfParent) {
            return errorResponse(400, 'Bạn không có quyền cấp thuốc cho học sinh khác')
        }
        if (!parentInfo) {
            return errorResponse(400, 'Không tìm thấy phụ huynh này')
        }
        let medicines = data.items;
        if (medicines.length === 0) {
            return errorResponse(400, 'Không có thuốc nào được gửi')
        }
        try {
            const parentID = parentInfo.id;
            const newMedicineRequestData = {
                studentID: data.studentID,
                parentID,
                note: data.note,
                createdBy: reqUser.id
            }
            const newMedicineRequest = await this.prisma.medicineRequest.create({
                data: newMedicineRequestData
            })
            const medicineItems = medicines.map((medicine) => ({
                requestID: newMedicineRequest.id,
                medicineName: medicine.medicineName,
                quantitySent: parseInt(medicine.quantitySent),
                dosage: medicine.dosage,
                usageTimes: medicine.usageTimes,
                startDate: DateHelper.parseDateStringToDate(medicine.startDate),
                endDate: DateHelper.parseDateStringToDate(medicine.endDate),
            }))

            await this.prisma.medicineRequestItem.createMany({
                data: medicineItems
            })
            return successResponse(200, 'Gửi thuốc thành công')
        } catch (error) {
            console.log(error)
            return errorResponse(400, 'Gửi thuốc thất bại')

        }



    }
}