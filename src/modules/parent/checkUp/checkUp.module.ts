import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { GetAllCheckUpParentController } from "./controllers/getAll.checkUp.parent.controller"
import { GetAllCheckUpParentService } from "./services/getAll.checkUp.parent.service"
import { AcceptedVaccinationEventParentController } from "./controllers/accepted.checkUp.parent.controller"
import { AcceptedCheckUpParentService } from "./services/accepted.checkUp.parent.service"
import { DeclinedCheckUpParentController } from "./controllers/declined.checkUp.parent.controller"
import { DeclinedCheckUpParentService } from "./services/declined.checkUp.parent.service"
import { checkUpNurseModule } from "src/modules/nurse/checkUp/checkUp.nurse.module"
import { DetailCheckUpParentService } from "./services/getDetail.checkUp.parent.service"
import { GetDetailCheckUpParentController } from "./controllers/getDetail.checkUp.parent.controller"
import { GetDetailCheckUpNurseService } from "src/modules/nurse/checkUp/services/getDetail.checkUp.nurse.service"
import { GetDetailResultCheckUpParentService } from "./services/getDetail.result.checkUp.parent.service"
import { GetResultCheckUpParentController } from "./controllers/getResult.checkUp.parent.controller"


const httpController = [
    GetAllCheckUpParentController,
    AcceptedVaccinationEventParentController,
    DeclinedCheckUpParentController,
    GetDetailCheckUpParentController,
    GetResultCheckUpParentController
]

const Services = [
    GetAllCheckUpParentService,
    AcceptedCheckUpParentService,
    DeclinedCheckUpParentService,
    DetailCheckUpParentService,
    GetDetailResultCheckUpParentService,
    JwtService
]


@Module({
    imports: [PrismaModule, checkUpNurseModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class CheckUpParentModule { }
