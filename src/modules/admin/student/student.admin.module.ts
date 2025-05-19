import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ImportStudentAdminController } from './controllers/import-student.admin.controller';
import { ImportStudentService } from './services/import-student.admin.service';
import { MailService } from 'src/modules/common/mail/mail.service';




const httpController = [
    ImportStudentAdminController
]

const Services = [
    ImportStudentService,
    JwtService,
    MailService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class StudentAdminModule { }
