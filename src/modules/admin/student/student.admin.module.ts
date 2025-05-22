import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ImportStudentAdminController } from './controllers/import-student.admin.controller';
import { ImportStudentService } from './services/import-student.admin.service';
import { MailService } from 'src/modules/common/mail/mail.service';
import { CreateStudentAdminController } from './controllers/create-student.admin.controller';
import { CreateStudentAdminService } from './services/create-student.admin.service';
import { UpdateStudentAdminController } from './controllers/update-student.admin.controller';
import { UpdateStudentAdminService } from './services/update-student.admin.service';




const httpController = [
    ImportStudentAdminController,
    CreateStudentAdminController,
    UpdateStudentAdminController
]

const Services = [
    ImportStudentService,
    CreateStudentAdminService,
    UpdateStudentAdminService,
    JwtService,
    MailService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class StudentAdminModule { }
