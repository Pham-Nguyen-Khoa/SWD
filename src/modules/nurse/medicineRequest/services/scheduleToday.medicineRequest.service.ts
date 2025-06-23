import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { startOfDay, endOfDay } from 'date-fns';
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service";

@Injectable()
export class ScheduleTodayMedicineRequestNurseService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly getDetailStudentAdminService: GetDetailStudentAdminService

    ) { }
    async schedule() {
        const today = new Date();
        const start = startOfDay(today);
        const end = endOfDay(today);

        // Lấy tất cả medicineItems thuộc các request đã xác nhận, còn hiệu lực trong hôm nay
        const items = await this.prisma.medicineRequestItem.findMany({
            where: {
                startDate: { lte: today },
                endDate: { gte: today },
                quantityRemaining: { gt: 0 },
                MedicineRequest: {
                    status: "CONFIRMED_RECEIVED",
                }
            },
            include: {
                MedicineLog: {
                    where: {
                        takenAt: {
                            gte: start,
                            lte: end
                        }
                    }
                },
                MedicineRequest: {
                    include: {
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
                }
            }
        });

        const schedule: any = [];

        for (const item of items) {
            for (const timeStr of item.usageTimes) {
                const [hour, minute] = timeStr.split(':').map(Number);
                const targetHour = hour;
                const targetMinute = minute;

                const matchedLog = item.MedicineLog.find(log => {
                    const h = log.takenAt.getHours();
                    const m = log.takenAt.getMinutes();
                    return h === targetHour && m === targetMinute;
                });

                schedule.push({
                    id: item.id,
                    studentID: item.MedicineRequest.studentID,
                    quantityRemaining: item.quantityRemaining,
                    medicineName: item.medicineName,
                    dosage: item.dosage,
                    timeToTake: timeStr,
                    alreadyTaken: !!matchedLog,
                    note: matchedLog?.note || null
                });
            }
        }

        const scheduleWithInfoStudent = await Promise.all(
            schedule.map(async (item) => {
                const studentInfo = await this.getDetailStudentAdminService.getDetail(item.studentID);
                return {
                    ...item,
                    student_code: studentInfo.student_code,
                    studentName: studentInfo.account.fullname,
                    class: studentInfo.lastAcamedicYear?.class.name,
                    gender: studentInfo.gender
                };
            })
        );
        scheduleWithInfoStudent.sort((a, b) => {
            const [aHour, aMinute] = a.timeToTake.split(':').map(Number);
            const [bHour, bMinute] = b.timeToTake.split(':').map(Number);

            if (aHour !== bHour) return aHour - bHour;
            return aMinute - bMinute;
        });
        return successResponse(200, scheduleWithInfoStudent, 'Lịch uống thuốc hôm nay');
    }
}