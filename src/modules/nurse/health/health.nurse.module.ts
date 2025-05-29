import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { GetAllHealthProfileNurseController } from "./controllers/getAll.health.profile.nurse.controller"
import { GetAllHealthProfileNurseService } from "./services/getAll.health.profile.nurse.service"

import { JwtService } from "@nestjs/jwt"
import { GetDetailHealthProfileNurseController } from "./controllers/getDetail.health.profile.nurse.controller"
import { GetDetailHealthProfileNurseService } from "./services/getDetail.health.profile.nurse.service"


const httpController = [
    GetAllHealthProfileNurseController,
    GetDetailHealthProfileNurseController
]

const Services = [
    GetAllHealthProfileNurseService,
    GetDetailHealthProfileNurseService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class HealthNurseModule { }
