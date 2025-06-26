// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import * as pug from 'pug';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'pnkvlog1508@gmail.com',
                pass: 'vpkl kqao sztj evdi',
            },
            pool: true,              // ✅ dùng connection pool
            maxConnections: 5,       // ✅ tối đa 5 kết nối SMTP song song
            maxMessages: 100,        // ✅ mỗi kết nối gửi tối đa 100 mail
            rateLimit: 5,            // ✅ không gửi quá 5 email mỗi giây (tuỳ nhà cung cấp)
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        return this.transporter.sendMail({
            from: '"Phòng Y Tế Trường THCS Trần Hưng Đạo" <your_email@example.com>',
            to,
            subject,
            html,
        });
    }

    async sendStudentAccountMail(studentEmail: string, studentName: string, rawPassword: string) {
        const templatePath = join(process.cwd(), 'src/configs/template/student-account.pug');
        // const templatePath = join(__dirname, '../../../configs/template/student-account.pug');

        const html = pug.renderFile(templatePath, {
            studentName,
            studentEmail,
            rawPassword,
        });

        await this.sendMail(studentEmail, 'Thông tin tài khoản học sinh', html);
    }


    async sendParentRegistrationMail(parentEmail: string, parentName: string, studentName: string, registrationLink: string) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/parent-registration.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            parentName,
            studentName,
            registrationLink,
        });

        // Gửi mail
        return this.sendMail(parentEmail, 'Thông báo đăng ký tài khoản phụ huynh', html);
    }


    async sendVaccinationNoticeMail(
        {
            to,
            fullname,
            role,
            scheduledAt,
            body,
            title
        }: {
            to: string;
            fullname: string;
            role: string;
            scheduledAt: string;
            title: string;
            body: string;
        }
    ) {
        const templatePath = join(process.cwd(), 'src/configs/template/vaccination-notification.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');
        console.log(title)
        const html = pug.renderFile(templatePath, {
            role,
            fullname,
            scheduledAt,
            body,
            title
        });

        return this.sendMail(to, title, html);
    }

    async sendNotificationResultVaccinationResultParent(vaccinationName: string, scheduledAt: string, parentEmail: string, parentName: string, studentName: string, status: string, result: string, note?: string) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/vaccination-result.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            vaccinationName,
            scheduledAt,
            parentName,
            studentName,
            status,
            result,
            note
        });

        // Gửi mail
        return this.sendMail(parentEmail, `Kết quả tiêm chủng của bé ${studentName} - ${vaccinationName}`, html);
    }



    async sendMedicalEventHospital(parentEmail: string, parentName: string, studentName: string, description: string, hospitalName: string, transferredAt: string) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/medical-Event-hospital.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            parentName,
            studentName,
            description,
            hospitalName,
            transferredAt,
        });

        // Gửi mail
        return this.sendMail(parentEmail, `Thông báo nhập viện em ${studentName}`, html);
    }

    async sendAcceptedMedicineRequest(parentEmail: string, studentName: string) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/medicine-request-accepted.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            studentName
        });

        // Gửi mail
        return this.sendMail(parentEmail, `Thông báo tiếp nhận đơn thuốc`, html);
    }

    async sendRejecetMedicineRequest(parentEmail: string, studentName: string) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/medicine-request-rejected.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            studentName,
        });

        // Gửi mail
        return this.sendMail(parentEmail, `Thông báo từ chối tiếp nhận đơn thuốc`, html);
    }


    async sendBenefitMedicineRequest(parentEmail: string, studentName: string, medicines: string[]) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/suggest_stop_medicines.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            studentName,
            medicines
        });

        // Gửi mail
        return this.sendMail(parentEmail, `Thông báo đề xuất tạm ngưng uống thuốc cho học sinh`, html);
    }

    async sendLowStockNotified(parentEmail: string, studentName: string, medicineName: string, quantityRemaining: number) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/low-stock-notification.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            studentName,
            medicineName,
            quantityRemaining
        });

        // Gửi mail
        return this.sendMail(parentEmail, `Thông báo số lượng thuốc sắp hết`, html);
    }




    async sendCheckUpNoticeMail(
        {
            to,
            fullname,
            role,
            scheduledAt,
            body,
            title,
            checkupItems
        }: {
            to: string;
            fullname: string;
            role: string;
            scheduledAt: string;
            title: string;
            body: string;
            checkupItems: string[]
        }
    ) {
        const templatePath = join(process.cwd(), 'src/configs/template/checkUp-notification.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');
        console.log(title)
        const html = pug.renderFile(templatePath, {
            role,
            fullname,
            scheduledAt,
            body,
            title,
            checkupItems
        });

        return this.sendMail(to, title, html);
    }


    async sendNotificationResultHealthCheckupParent(checkUpTitle: string, scheduledAt: string, parentEmail: string, parentName: string, studentName: string, status: string, overallNotes: string, overallResult?: string, checkupDetails?: any) {
        // Đường dẫn đến template pug
        const templatePath = join(process.cwd(), 'src/configs/template/checkUp-result.pug');
        // const templatePath = join(__dirname, '../../../configs/template/parent-registration.pug');

        const html = pug.renderFile(templatePath, {
            checkUpTitle,
            scheduledAt,
            parentName,
            studentName,
            status,
            overallNotes,
            overallResult,
            checkupDetails
        });

        // Gửi mail
        return this.sendMail(parentEmail, `Kết quả tiêm chủng của bé ${studentName} - ${checkUpTitle}`, html);
    }


}
