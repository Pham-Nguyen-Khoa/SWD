import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { GetAllMeetingParentService } from "./services/getAllMeeting.parent.service"
import { GetAllMeetingParentController } from "./controllers/getAllMeeting.parent.controller"
import { StudentParentService } from "../health/services/student.parent.service"
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service"
import { StudentAdminModule } from "src/modules/admin/student/student.admin.module"
import { AcceptMeetingParentController } from "./controllers/acceptedMeeting.parent.controller"
import { DeclineMeetingParentController } from "./controllers/declinedMeeting.parent.controller"
import { AcceptMeetingParentService } from "./services/acceptedMeeting.parent.service"
import { DeclineMeetingParentService } from "./services/declinedMeeting.parent.service"



const httpController = [
    GetAllMeetingParentController,
    AcceptMeetingParentController,
    DeclineMeetingParentController
]

const Services = [
    GetAllMeetingParentService,
    AcceptMeetingParentService,
    DeclineMeetingParentService,
    StudentParentService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MeetingParentModule { }
