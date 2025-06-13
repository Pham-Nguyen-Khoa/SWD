import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"

import { JwtService } from "@nestjs/jwt"
import { MailService } from "src/modules/common/mail/mail.service"
import { GetAllRequestController } from "./controllers/getAllRequest.manager.controller"
import { GetAllRequestService } from "./services/getAllRequest.manager.service"
import { DetailRequestManagerService } from "./services/getDetailRequest.manager.service"
import { GetDetailRequestManagerController } from "./controllers/getDetailRequest.manager.controller"
import { ApprovedRequestManagerController } from "./controllers/approvedRequest.manager.controller"
import { ApproveRequestManagerService } from "./services/approveRequest.manager.service"
import { RejectedRequestManagerController } from "./controllers/rejectedRequest.manager.controller"
import { RejectedRequestManagerService } from "./services/rejectedRequest.manager.service"


const httpController = [
    GetAllRequestController,
    GetDetailRequestManagerController,
    ApprovedRequestManagerController,
    RejectedRequestManagerController
]

const Services = [
    GetAllRequestService,
    DetailRequestManagerService,
    ApproveRequestManagerService,
    RejectedRequestManagerService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class RequestModule { }
