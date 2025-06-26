import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { GetAllCheckUpParentController } from "./controllers/getAll.checkUp.parent.controller"
import { GetAllCheckUpParentService } from "./services/getAll.checkUp.parent.service"
import { AcceptedVaccinationEventParentController } from "./controllers/accepted.checkUp.parent.controller"
import { AcceptedCheckUpParentService } from "./services/accepted.checkUp.parent.service"
import { DeclinedCheckUpParentController } from "./controllers/declined.checkUp.parent.controller"
import { DeclinedCheckUpParentService } from "./services/declined.checkUp.parent.service"


const httpController = [
    GetAllCheckUpParentController,
    AcceptedVaccinationEventParentController,
    DeclinedCheckUpParentController
]

const Services = [
    GetAllCheckUpParentService,
    AcceptedCheckUpParentService,
    DeclinedCheckUpParentService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class CheckUpParentModule { }
