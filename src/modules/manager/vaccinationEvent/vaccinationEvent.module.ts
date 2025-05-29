import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"

import { JwtService } from "@nestjs/jwt"
import { CreateVaccinationEventManagerController } from "./controllers/create.vaccinationEvent.manager.controller"
import { CreateVaccinationEventManagerService } from "./services/create.vaccinationEvent.manager.service"
import { UpdateVaccinationEventManagerService } from "./services/update.vaccinationEvent.manager.service"
import { UpdateVaccinationEventManagerController } from "./controllers/update.vaccinationEvent.manager.controller"
import { GetDetailVaccinationEventManagerService } from "./services/getDetail.vaccinationEvent.manager.service"
import { GetDetailVaccinationEventManagerController } from "./controllers/getDetail.vaccinationEvent.manager.controller"
import { GetAllClassManagerController } from "./controllers/getAllClass.manager.controller"
import { GetAllClassManagerService } from "./services/getAllClass.manager.service"
import { DeleteVaccinationEventManagerService } from "./services/delete.vaccinationEvent.manager.service"
import { DeleteVaccinationEventManagerController } from "./controllers/delete.vaccinationEvent.manager.controller"
import { ConfirmVaccinationEventManagerController } from "./controllers/confirm,vaccinationEvent.manager.controller"
import { ConfrimVaccinationEventManagerService } from "./services/confirm.vaccinationEvent.manager.service"


const httpController = [
    GetAllClassManagerController,
    CreateVaccinationEventManagerController,
    UpdateVaccinationEventManagerController,
    GetDetailVaccinationEventManagerController,
    ConfirmVaccinationEventManagerController,
    DeleteVaccinationEventManagerController
]

const Services = [
    GetAllClassManagerService,
    DeleteVaccinationEventManagerService,
    CreateVaccinationEventManagerService,
    UpdateVaccinationEventManagerService,
    ConfrimVaccinationEventManagerService,
    GetDetailVaccinationEventManagerService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class VaccinationEventModule { }
