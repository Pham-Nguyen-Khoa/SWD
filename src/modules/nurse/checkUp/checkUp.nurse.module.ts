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
import { GetDetailCheckUpNurseService } from "./services/getDetail.checkUp.nurse.service"
import { GetDetailCheckUpNurseController } from "./controllers/getDetail.checkUp.nurse.controller"
import { GetResultsCheckUpNurseService } from "./services/getResults.nurse.service"
import { GetResultsCheckUpNurseController } from "./controllers/getResults.nurse.controller"
import { GetDetailResultCheckUpNurseController } from "./controllers/getDetail.result.checkUp.nurse.controller"
import { GetDetailResultCheckUpNurseService } from "./services/getDetail.result.checkUp.nurse.service"
import { SendNotificationResultCheckUpNurseService } from "./services/sendNotificationResult.checkUp.nurse.service"
import { SendNotificationResultCheckUpNurseController } from "./controllers/sendNotificationResult.checkUp.nurse.controller"



const httpController = [
    GetAllCheckUpNurseController,
    StudentResultStatusCheckUpNurseController,
    GetContentsCheckUpNurseController,
    ResultCheckUpNurseController,
    GetDetailCheckUpNurseController,
    GetResultsCheckUpNurseController,
    GetDetailResultCheckUpNurseController,
    SendNotificationResultCheckUpNurseController
]

const Services = [
    GetAllVaccinationEventNurseService,
    StudentResultStatusCheckUpNurseService,
    GetCheckupContentsService,
    ResultCheckUpNurseService,
    GetDetailCheckUpNurseService,
    GetResultsCheckUpNurseService,
    GetDetailResultCheckUpNurseService,
    SendNotificationResultCheckUpNurseService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
    exports: [GetDetailCheckUpNurseService,GetDetailResultCheckUpNurseService]

})
export class checkUpNurseModule { }
