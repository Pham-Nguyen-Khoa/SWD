import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { JwtService } from "@nestjs/jwt"
import { CreateMedicalEventNurseController } from "./controllers/create.medicalEvent.nurse.controller"
import { CreateMedicalEventNurseService } from "./services/create.medicalEvent.nurse.service"
import { MailService } from "src/modules/common/mail/mail.service"
import { GetAllMedicalEventNurseService } from "./services/getAll.medicalEvent.nurse.service"
import { GetAllMedicalEventNurseController } from "./controllers/getAll.medicalEvent.nurse.controller"
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service"
import { StudentAdminModule } from "src/modules/admin/student/student.admin.module"
import { GetDetailMedicalEventNurseController } from "./controllers/getDetail.medicalEvent.nurse.controller"
import { GetDetailMedicalEventNurseService } from "./services/getDetail.medicalEvent.nurse.service"
import { SendNotificationMedicalEventNurseService } from "./services/sendNotificationMedicalEvent.nurse.service"
import { SendNotificationMedicalEventNurseController } from "./controllers/sendNotificationMedicalEvent.nurse.controller"
import { UpdateStatusMedicalEventNurseController } from "./controllers/update.status.medicalEvent.nurse.controller"
import { UpdateStatusMedicalEventNurseService } from "./services/update.status.medicalEvent.nurse.service"

const httpController = [
    CreateMedicalEventNurseController,
    GetAllMedicalEventNurseController,
    GetDetailMedicalEventNurseController,
    SendNotificationMedicalEventNurseController,
    UpdateStatusMedicalEventNurseController

]

const Services = [
    CreateMedicalEventNurseService,
    GetAllMedicalEventNurseService,
    GetDetailMedicalEventNurseService,
    SendNotificationMedicalEventNurseService,
    UpdateStatusMedicalEventNurseService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicalEventNurseModule { }
