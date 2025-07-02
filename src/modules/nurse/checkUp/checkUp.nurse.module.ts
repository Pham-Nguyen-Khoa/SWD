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
import { CreateIsMeetingNurseService } from "./services/createMeeting.nurse.service"
import { CreateMeetingNurseController } from "./controllers/createMeeting.nurse.controller"
import { CheckMeetingNurseService } from "./services/checkMeeting.nurse.service"
import { CheckMeetingCheckUpNurseController } from "./controllers/checkMeeting.nurse.controller"
import { CompleteMeetingNurseService } from "./services/completeMeeting.nurse.service"
import { CompleteIsMeetingNurseController } from "./controllers/completeMeeting.nurse.controller"
import { GetAllStudentIsMeetingNurseController } from "./controllers/getAllStudentIsMeeting.nurse.controller"
import { GetAllStudentIsMeetingNurseService } from "./services/getAllStudentIsMeeting.nurse.service"
import { GetAllIsMeetingNurseController } from "./controllers/getAllIsMeeting.nurse.controller"
import { GetAllIsMeetingNurseService } from "./services/getAllIsMeeting.nurse.controller"
import { DeleteStudentIsMeetingNurseService } from "./services/deleteStudentIsMeeting.nurse.service"
import { DeleteStudentIsMeetingNurseController } from "./controllers/deleteStudentIsMeeting.nurse.controller"
import { DeleteIsMeetingNurseController } from "./controllers/deleteIsMeeting.nurse.controller"
import { DeleteIsMeetingNurseService } from "./services/deleteIsMeeting.nurse.service"



const httpController = [
    GetAllCheckUpNurseController,
    StudentResultStatusCheckUpNurseController,
    GetContentsCheckUpNurseController,
    GetAllStudentIsMeetingNurseController,
    GetAllIsMeetingNurseController,
    DeleteStudentIsMeetingNurseController,
    DeleteIsMeetingNurseController,
    CreateMeetingNurseController,
    CheckMeetingCheckUpNurseController,
    CompleteIsMeetingNurseController,
    ResultCheckUpNurseController,
    GetDetailCheckUpNurseController,
    GetResultsCheckUpNurseController,
    GetDetailResultCheckUpNurseController,
    SendNotificationResultCheckUpNurseController,
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
    CheckMeetingNurseService,
    GetAllStudentIsMeetingNurseService,
    GetAllIsMeetingNurseService,
    DeleteStudentIsMeetingNurseService,
    DeleteIsMeetingNurseService,
    CreateIsMeetingNurseService,
    CompleteMeetingNurseService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
    exports: [GetDetailCheckUpNurseService, GetDetailResultCheckUpNurseService]

})
export class checkUpNurseModule { }
