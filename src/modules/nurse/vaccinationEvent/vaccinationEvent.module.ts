import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"


import { JwtService } from "@nestjs/jwt"
import { GetAllVaccinationEventNurseController } from "./controllers/getAllVacinationEvent.nurse.controller"
import { GetAllVaccinationEventNurseService } from "./services/getAlVacinationEvent.nurse.service"
import { GetDetailVaccinationEventNurseController } from "./controllers/getDetail.vaccinationEvent.nurse.controller"
import { GetDetailVaccinationEventNurseService } from "./services/getDetail.vaccinationEvent.nurse.service"
import { ResultVaccinationEventNurseController } from "./controllers/resultVaccinationEvent.nurse.controller"
import { ResultVaccinationEventNurseService } from "./services/resultVaccinationEvent.nurse.service"
import { GetDetailResultVaccinationEventNurseController } from "./controllers/getDetailResultVaccinationEvent.nurse.controller"
import { GetDetailResultVaccinationEventNurseService } from "./services/getDetailResultVaccinationEvent.nurse.service"
import { UpdateResultVaccinationEventNurseController } from "./controllers/updateResultVaccination.nurse.controller"
import { UpdateResultVaccinationNurseService } from "./services/updateResultVaccination.nurse.service"



const httpController = [
    GetAllVaccinationEventNurseController,
    GetDetailVaccinationEventNurseController,
    ResultVaccinationEventNurseController,
    GetDetailResultVaccinationEventNurseController,
    UpdateResultVaccinationEventNurseController

]

const Services = [
    GetAllVaccinationEventNurseService,
    GetDetailVaccinationEventNurseService,
    ResultVaccinationEventNurseService,
    GetDetailResultVaccinationEventNurseService,
    UpdateResultVaccinationNurseService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class VaccinationEventNurseModule { }
