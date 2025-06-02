import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { GetAllVaccinationEventParentController } from "./controllers/getAllVaccinationEvent.parent.controller"
import { GetAllVaccinationEventParentService } from "./services/getAllVaccinationEvent.parent.service"
import { AcceptedVaccinationEventParentService } from "./services/acceptVaccinationEvent.parent.service"
import { AcceptedVaccinationEventParentController } from "./controllers/acceptVaccinationEvent.parent.controller"
import { DeclinedVaccinationEventParentController } from "./controllers/declinedVaccinationEvent.parent.controller"
import { DeclinedVaccinationEventParentService } from "./services/declinedVaccinationEvent.parent.service"

const httpController = [
    GetAllVaccinationEventParentController,
    AcceptedVaccinationEventParentController,
    DeclinedVaccinationEventParentController
]

const Services = [
    GetAllVaccinationEventParentService,
    AcceptedVaccinationEventParentService,
    DeclinedVaccinationEventParentService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class VaccinationEventParentModule { }
