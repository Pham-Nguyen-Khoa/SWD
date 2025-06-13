import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"


import { JwtService } from "@nestjs/jwt"
import { GetAllMedicineNurseController } from "./controllers/getAllMedicine.nurse.controller"
import { GetAllMedicineNurseService } from "./services/getAllMedicine.nurse.service"
import { GetAllMedicineClassifyNurseController } from "./controllers/getAllMedicineClassify.nurse.controller"
import { GetAllMedicineClassifyNurseService } from "./services/getAllMedicineClassify.nurse.service"
import { SendRequestNurseController } from "./controllers/sendRequestManager.nurse.controller"
import { SendRequestNurseService } from "./services/sendRequestManager.nurse.service"
import { GetAllMedicineSupplyNurseService } from "./services/getAllMedicineSupply.nurse.service"
import { GetAllMedicineSupplyNurseController } from "./controllers/getAllMedicineSupply.nurse.controller"
import { GetAllRequestManagerNurseService } from "./services/getAllRequestManager.nurse.service"
import { GetAllSendRequestManagerNurseController } from "./controllers/getAllRequestManager.nurse.controller"
import { GetDetailRequestManagerNurseService } from "./services/getDetailRequestManager.nurse.service"
import { GetDetailSendRequestManagerNurseController } from "./controllers/getDetailRequestManager.nurse.controller"



const httpController = [
    GetAllMedicineNurseController,
    GetAllMedicineClassifyNurseController,
    GetAllMedicineSupplyNurseController,
    GetAllSendRequestManagerNurseController,
    GetDetailSendRequestManagerNurseController,
    SendRequestNurseController

]

const Services = [
    GetAllMedicineNurseService,
    GetAllMedicineClassifyNurseService,
    SendRequestNurseService,
    GetAllMedicineSupplyNurseService,
    GetAllRequestManagerNurseService,
    GetDetailRequestManagerNurseService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicineNurseModule { }
