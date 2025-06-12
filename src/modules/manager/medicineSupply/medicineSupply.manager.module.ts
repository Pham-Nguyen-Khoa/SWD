import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { JwtService } from "@nestjs/jwt"
import { UploadModule } from "src/modules/common/cloudinary/upload/upload.module"
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service"
import { CloudinaryModule } from "src/modules/common/cloudinary/cloudinary.module"
import { CreateMedicineSupplyManagerService } from "./services/create.medicineSupply.manager.service"
import { CreateMedicineSupplyManagerController } from "./controllers/create.medicineSupply.manager.controller"
import { UpdateMedicineSupplyManagerController } from "./controllers/update.medicineSupply.manager.controller"
import { UpdateMedicineSupplyManagerService } from "./services/update.medicineSupply.manager.service"
import { GetAllMedicineSupplyManagerService } from "./services/getAll.medicineSupply.manager.service"
import { GetAllMedicineSupplyManagerController } from "./controllers/getAll.medicineSupply.manager.controller"
import { DeleteMedicineSupplyManagerController } from "./controllers/delete.medicineSupply.manager.controller"
import { DeleteMedicineSupplyManagerService } from "./services/delete.medicineSupply.manager.service"



const httpController = [
    CreateMedicineSupplyManagerController,
    UpdateMedicineSupplyManagerController,
    GetAllMedicineSupplyManagerController,
    DeleteMedicineSupplyManagerController,

]

const Services = [
    CreateMedicineSupplyManagerService,
    UpdateMedicineSupplyManagerService,
    GetAllMedicineSupplyManagerService,
    DeleteMedicineSupplyManagerService,
    UploadService,
    JwtService
]


@Module({
    imports: [PrismaModule, UploadModule, CloudinaryModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicineSupplyManagerModule { }
