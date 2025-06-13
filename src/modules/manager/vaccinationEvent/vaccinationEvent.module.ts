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
import { MailService } from "src/modules/common/mail/mail.service"
import { GetAllVaccinationEventNurseController } from "./controllers/getAllVaccinationEvent.manager.controller"
import { GetAllVaccinationEventManagerService } from "./services/getAllVaccinationEvent.manager.service"
import { SuccessVaccinationEventManagerController } from "./controllers/success.vaccinationEvent.manager.controller"
import { SuccessVaccinationEventManagerService } from "./services/success.vaccinationEvent.manager.service"
import { GetAllMedicineAndSupplyManagerService } from "./services/getAllMedicineandSupply.manager.service"
import { GetAllMedicineAndSupplyNurseController } from "./controllers/getAllMedicineandSupply.manager.controller"


const httpController = [
    GetAllClassManagerController,
    CreateVaccinationEventManagerController,
    UpdateVaccinationEventManagerController,
    GetDetailVaccinationEventManagerController,
    ConfirmVaccinationEventManagerController,
    DeleteVaccinationEventManagerController,
    GetAllVaccinationEventNurseController,
    SuccessVaccinationEventManagerController,
    GetAllMedicineAndSupplyNurseController
]

const Services = [
    GetAllClassManagerService,
    DeleteVaccinationEventManagerService,
    CreateVaccinationEventManagerService,
    UpdateVaccinationEventManagerService,
    ConfrimVaccinationEventManagerService,
    GetDetailVaccinationEventManagerService,
    GetAllVaccinationEventManagerService,
    SuccessVaccinationEventManagerService,
    GetAllMedicineAndSupplyManagerService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class VaccinationEventModule { }
