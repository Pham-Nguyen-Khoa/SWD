import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { JwtService } from "@nestjs/jwt"
import { GetAllMedicalEventManagerController } from "./controllers/getAll.medicalEvent.manager.controller"
import { GetDetailMedicalEventManagerController } from "./controllers/getDetail.medicalEvent.manager.controller"
import { StudentAdminModule } from "src/modules/admin/student/student.admin.module"
import { GetAllMedicalEventManagerService } from "./services/getAll.medicalEvent.manager.service"
import { GetDetailMedicalEventManagerService } from "./services/getDetail.medicalEvent.manager.service"
import { MailService } from "src/modules/common/mail/mail.service"

const httpController = [
    GetAllMedicalEventManagerController,
    GetDetailMedicalEventManagerController,


]

const Services = [
    GetAllMedicalEventManagerService,
    GetDetailMedicalEventManagerService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicalEventManagerModule { }
