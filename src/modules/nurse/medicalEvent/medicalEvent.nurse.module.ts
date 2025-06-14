import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { JwtService } from "@nestjs/jwt"
import { CreateMedicalEventNurseController } from "./controllers/create.medicalEvent.nurse.controller"
import { CreateMedicalEventNurseService } from "./services/create.medicalEvent.nurse.service"

const httpController = [
    CreateMedicalEventNurseController

]

const Services = [
    CreateMedicalEventNurseService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicalEventNurseModule { }
