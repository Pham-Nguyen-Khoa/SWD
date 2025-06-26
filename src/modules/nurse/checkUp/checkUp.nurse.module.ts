import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { JwtService } from "@nestjs/jwt"
import { MailService } from "src/modules/common/mail/mail.service"
import { GetAllCheckUpNurseController } from "./controllers/getAllCheckUp.nurse.controller"
import { GetAllVaccinationEventNurseService } from "./services/getAllCheckUp.nurse.service"
import { StudentAdminModule } from "src/modules/admin/student/student.admin.module"
import { StudentResultStatusCheckUpNurseController } from "./controllers/students-result-status.nurse.controller"
import { StudentResultStatusCheckUpNurseService } from "./services/students-result-status.nurse.service"
import { GetContentsCheckUpNurseController } from "./controllers/getContents.checkUp.nurse.controller"
import { GetCheckupContentsService } from "./services/getContents.checkUp.nurse.service"
import { ResultCheckUpNurseService } from "./services/resultCheckUp.nurse.controller"
import { ResultCheckUpNurseController } from "./controllers/resultCheckUp.nurse.controller"



const httpController = [
    GetAllCheckUpNurseController,
    StudentResultStatusCheckUpNurseController,
    GetContentsCheckUpNurseController,
    ResultCheckUpNurseController
]

const Services = [
    GetAllVaccinationEventNurseService,
    StudentResultStatusCheckUpNurseService,
    GetCheckupContentsService,
    ResultCheckUpNurseService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class checkUpNurseModule { }
