import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { MailService } from "src/modules/common/mail/mail.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import pLimit from "p-limit";


@Injectable()
export class SendNotificationResultCheckUpNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailService,
    ) { }

    async sendNotification(checkupID: number, reqUser) {
        // Check đã gửi thông báo chưa
        // const checkSend = await this.prisma.healthCheckupResult.findFirst({
        //     where: {
        //         healthCheckUpID: checkupID,
        //         isSend: true
        //     }
        // })
        // if (checkSend) {
        //     return errorResponse(400, 'Buổi khám sức khỏe này đã được gửi thông báo đến phụ huynh trước đó ')
        // }
        const checkup = await this.prisma.healthCheckup.findUnique({
            where: { id: checkupID },
            select: {
                title: true,
                scheduledAt: true,
            },
        });

        if (!checkup) {
            return errorResponse(400, 'Không tìm thấy buổi khám sức khỏe');
        }
        const results = await this.prisma.healthCheckupResult.findMany({
            where: {
                healthCheckUpID: checkupID,
                // isSend: false
            },
            include: {
                student: {
                    include: {
                        account: true,
                        ParentInfo: true,
                    }
                }
            }
        });
        if (!results.length) {
            return errorResponse(400, 'Không có kết quả nào cần gửi hoặc đã gửi rồi');
        }
        // Lấy danh sách nội dung khám (ID)
        const contentIDs = await this.prisma.healthCheckupContent.findMany({
            where: { healthCheckUpID: checkupID },
            select: { id: true }
        });
        const contentIdArray = contentIDs.map(c => c.id);

        // Lấy toàn bộ kết quả nội dung khám
        const contentResults = await this.prisma.healthCheckupContentResult.findMany({
            where: { contentID: { in: contentIdArray } },
            include: { healthCheckupContent: true }
        });

        // Tạo map để group contentResults theo studentID
        const contentResultMap = new Map<number, typeof contentResults>();

        for (const result of contentResults) {
            if (!contentResultMap.has(result.studentID)) {
                contentResultMap.set(result.studentID, []);
            }
            contentResultMap.get(result.studentID)!.push(result);
        }

        // Giới hạn luồng gửi email
        const limit = pLimit(10);

        // Gửi email theo từng học sinh
        await Promise.all(
            results.map(result =>
                limit(async () => {
                    const studentContentResults = contentResultMap.get(result.studentID) || [];

                    await this.mailer.sendNotificationResultHealthCheckupParent(
                        checkup.title,
                        checkup.scheduledAt.toLocaleDateString('vi-VN'),
                        result.student.ParentInfo.email,
                        result.student.ParentInfo.fullname,
                        result.student.account.fullname,
                        result.status,
                        result.overallNotes || '',
                        result.overallResult || '',
                        studentContentResults
                    );
                })
            )
        );

        // Đánh dấu đã gửi
        await this.prisma.healthCheckupResult.updateMany({
            where: { healthCheckUpID: checkupID },
            data: { isSend: true }
        });

        return successResponse(200, 'Gửi kết quả khám sức khỏe đến phụ huynh thành công');


    }
}