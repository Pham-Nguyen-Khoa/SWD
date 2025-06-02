import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()

export class AcedemicYearScheduler {
    private readonly logger = new Logger(AcedemicYearScheduler.name)
    constructor(
        private readonly prisma: PrismaService,

    ) {
    }
    @Cron('0 0 0 31 5 *')
    // @Cron('0 * * * * *')
    async handleNewAcademicYear() {
        this.logger.debug('Bắt đầu xử lý tạo năm học mới và lên lớp');
        const now = new Date();
        const startYear = now.getFullYear();
        // const oldYearName = `${startYear}-${startYear + 1}`
        // const newYearName = `${startYear + 1}-${startYear + 2}`
        const oldYearName = `${startYear - 1}-${startYear}`
        const newYearName = `${startYear}-${startYear + 1}`

        try {
            let newYear = await this.prisma.academicYear.findUnique({
                where: {
                    name: newYearName
                }
            })
            if (!newYear) {
                newYear = await this.prisma.academicYear.create({
                    data: {
                        name: newYearName,
                        startDate: new Date(startYear, 8, 1),
                        endDate: new Date(startYear + 1, 4, 31)
                    }
                })
            }
            const oldYear = await this.prisma.academicYear.findUnique({
                where: { name: oldYearName }
            });
            if (!oldYear) {
                this.logger.warn(`Năm học cũ ${oldYearName} không tồn tại`);
                return;
            }
            const oldAssignments = await this.prisma.studentClassAssignment.findMany({
                where: { academicYearID: oldYear.id },
                include: {
                    class: true,
                    student: true,
                }
            })
            for (const assign of oldAssignments) {
                const oldClassName = assign.class.name;
                const grade = assign.class.grade;
                const suffixMatch = oldClassName.match(/\D+\d*$/);
                const suffix = suffixMatch ? suffixMatch[0] : '';
                if (grade >= 12) {
                    await this.prisma.student.update({
                        where: { id: assign.studentID },
                        data: {
                            graduated: true
                        }
                    })
                    continue;
                }
                console.log(grade)
                const newClass = await this.prisma.class.findFirst({
                    where: {
                        grade: grade + 1,
                        name: { endsWith: suffix }
                    }
                })
                if (!newClass) {
                    this.logger.warn(`Không tìm thấy lớp cho grade ${grade + 1}`);
                    continue;
                }
                await this.prisma.studentClassAssignment.create({
                    data: {
                        studentID: assign.studentID,
                        classID: newClass.id,
                        academicYearID: newYear.id
                    }
                })
            }
            this.logger.debug(`Xử lý năm học mới ${newYearName} và lên lớp hoàn tất`);
        } catch (error) {
            this.logger.error('Lỗi khi xử lý năm học mới:', error);
        }
    }
}