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
import { GetAllStudentAdminService } from './services/getAll-student.admin.service';
import { GetAllStudentAdminController } from './controllers/getAll-student.admin.controller';
import { GetDetailStudentAdminController } from './controllers/get-detail-student.admin.controller';
import { GetDetailStudentAdminService } from './services/get-detail-student.admin.service';




const httpController = [
    ImportStudentAdminController,
    CreateStudentAdminController,
    UpdateStudentAdminController,
    GetAllStudentAdminController,
    GetDetailStudentAdminController
]

const Services = [
    ImportStudentService,
    CreateStudentAdminService,
    UpdateStudentAdminService,
    GetAllStudentAdminService,
    GetDetailStudentAdminService,
    JwtService,
    MailService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class StudentAdminModule { }
