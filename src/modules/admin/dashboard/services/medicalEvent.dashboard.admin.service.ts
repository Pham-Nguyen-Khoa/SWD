import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { format } from "date-fns"
import { GetDashboardMedicalEventQuery } from "../dtos/medicalEvent.dashboard.admin.query";
import { errorResponse, successResponse } from "src/common/utils/response.util";

@Injectable()

export class MedicalEventDashBoardAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async medicalEventDashboard(query: GetDashboardMedicalEventQuery) {
        try {
            const {
                from,
                to,
                filter,
                classID
            } = query
            const today = new Date()

            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);


            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

            let startDate: Date;
            let endDate: Date;
            if (from && to) {
                startDate = new Date(from);
                endDate = new Date(new Date(to).getTime() + 86400000); // +1 ngày
            } else {
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            }

            const where: any = {};

            if (filter !== 'all') {
                where.occurredAt = {
                    gte: startDate,
                    lt: endDate
                };
            }

            if (classID) {
                const newestAcademicYear = await this.prisma.academicYear.findFirst({
                    orderBy: {
                        startDate: 'desc'
                    }
                });
                const students = await this.prisma.studentClassAssignment.findMany({
                    where: {
                        classID: parseInt(classID),
                        academicYearID: newestAcademicYear?.id
                    },
                    select: {
                        id: true,
                    }
                })
                const studentsID = students.map((student) => student.id)
                where.studentID = {
                    in: studentsID
                }
            }
            const [eventsToday, eventsThisMonth, eventsTotal, medicalEvents] = await this.prisma.$transaction([
                this.prisma.medicalEvent.count({
                    where: {
                        occurredAt: {
                            gte: startOfToday,
                            lt: endOfToday
                        }
                    },
                }),
                this.prisma.medicalEvent.count({
                    where: {
                        occurredAt: {
                            gte: startOfMonth,
                            lt: endOfMonth
                        }
                    }
                }),
                this.prisma.medicalEvent.count({
                }),
                this.prisma.medicalEvent.findMany({
                    where: where,
                    select: {
                        type: true,
                        occurredAt: true,
                        severity: true
                    }
                })
            ])
            const daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            const timelineMap = {};

            for (
                let d = new Date(startDate);
                d < endDate;
                d.setDate(d.getDate() + 1)
            ) {
                const day = format(new Date(d), 'yyyy-MM-dd');
                timelineMap[day] = 0;
            }

            const eventByTypeMap: Record<string, number> = {};
            const eventBySeverityMap: Record<string, number> = {};
            medicalEvents.map(event => {
                const dateKey = format(new Date(event.occurredAt), 'yyyy-MM-dd');
                const type = event.type || 'Không xác định';
                const severiry = event.severity || 'NORMAL';
                timelineMap[dateKey] = (timelineMap[dateKey] || 0) + 1;
                eventByTypeMap[type] = (eventByTypeMap[type] || 0) + 1;
                eventBySeverityMap[severiry] = (eventBySeverityMap[severiry] || 0) + 1;

            })

            const eventTimeline = Object.entries(timelineMap).map(([date, count]) => ({ date, count }));
            const eventByType = Object.entries(eventByTypeMap).map(([type, count]) => ({
                type,
                count
            }));
            const eventBySeverity = Object.entries(eventBySeverityMap).map(([severiry, count]) => ({
                severiry,
                count
            }));
            const result = {
                summary: {
                    eventsToday,
                    eventsThisMonth,
                    eventsTotal,
                },
                eventTimeline,
                eventByType,
                eventBySeverity
            }
            return successResponse(200, result, 'Lấy thống kế sự kiện y tế thành công')
        } catch (error) {
            return errorResponse(400, 'Lấy thống kế sự kiện y tế thất bại')
        }

    }
}