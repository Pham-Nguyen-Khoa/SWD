import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CheckUpResultDto } from "../dtos/result.checkUp.nurse.dto";

@Injectable()
export class ResultCheckUpNurseService {
    constructor(private readonly prisma: PrismaService) { }

    async recordCheckupResults(checkupID: number, data: CheckUpResultDto, reqUser) {
        const checkup = await this.prisma.healthCheckup.findUnique({
            where: { id: checkupID },
            include: { HealthCheckupContent: true }
        });

        if (!checkup) {
            return errorResponse(400, 'Không tìm thấy buổi khám sức khỏe');
        }

        // Lấy danh sách studentID mà phụ huynh đã đồng ý
        const acceptedResponses = await this.prisma.healthCheckupResponse.findMany({
            where: {
                healthCheckUpID: checkupID,
                status: 'ACCEPTED',
            },
            select: { studentID: true },
        });

        const studentIDs = acceptedResponses.map(r => r.studentID);
        // Kiểm tra học sinh nằm trong danh sách hợp lệ
        if (!studentIDs.includes(data.studentID)) {
            return errorResponse(400, 'Học sinh không nằm trong danh sách được khám');
        }
        // Kiểm tra xem đã có kết quả chưa
        if (data.results && data.results.length > 0) {
            const existing = await this.prisma.healthCheckupContentResult.findMany({
                where: {
                    studentID: data.studentID,
                    contentID: { in: data.results.map(r => r.contentID) }
                }
            });
            if (existing.length > 0) {
                return errorResponse(400, 'Học sinh đã có kết quả cho 1 số nội dung');
            }
        }


        // Tạo transaction ghi kết quả
        const operations: any = [];

        // 1. Ghi nhận kết quả tổng quát
        operations.push(
            this.prisma.healthCheckupResult.create({
                data: {
                    healthCheckUpID: checkupID,
                    studentID: data?.studentID,
                    status: data?.status,
                    isMeeting: data?.isMeeting,
                    overallNotes: data?.overallNotes || null,
                    overallResult: data?.overallResult,
                    createdBy: reqUser?.id
                }
            })
        );

        // 2. Nếu học sinh có mặt thì lưu từng nội dung
        if (data.status === "SUCCESS" && data.results && data.results?.length > 0) {
            const resultEntities = data.results.map(result => ({
                studentID: data.studentID,
                contentID: result.contentID,
                value: result.value,
                note: result.note || '',
            }));
            operations.push(
                this.prisma.healthCheckupContentResult.createMany({
                    data: resultEntities
                })
            );

            await this.prisma.healthCheckupStock.updateMany({
                where: {
                    healthCheckUpID: checkupID
                },
                data: {
                    quantityUsed: {
                        increment: 1
                    }
                }
            })
            const checkUpStock = await this.prisma.healthCheckupStock.findMany({
                where: { healthCheckUpID: checkupID }
            })
            // Cập nhật số lượng thuốc trong kho 
            for (const item of checkUpStock) {
                // Nếu là thuốc
                if (item.medicineID) {
                    await this.prisma.medicine.update({
                        where: { id: item.medicineID },
                        data: {
                            stock: {
                                decrement: 1,
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
                                decrement: 1,
                            },
                        },
                    });
                }
            }
        }

        await this.prisma.$transaction(operations);


        return successResponse(200, 'Ghi nhận kết quả thành công');


    }
}
