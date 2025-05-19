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
}
