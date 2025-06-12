import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"

import { JwtService } from "@nestjs/jwt"
import { MailService } from "src/modules/common/mail/mail.service"
import { GetAllRequestController } from "./controllers/getAllRequest.manager.controller"
import { GetAllRequestService } from "./services/getAllRequest.manager.service"


const httpController = [
    GetAllRequestController
]

const Services = [
    GetAllRequestService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class RequestModule { }
