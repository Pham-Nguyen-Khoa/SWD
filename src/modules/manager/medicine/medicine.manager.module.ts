import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { CreateMedicineManagerController } from "./controllers/create.medicine.manager.controller"
import { CreateMedicineManagerService } from "./services/create.medicine.manager.service"
import { JwtService } from "@nestjs/jwt"
import { UploadModule } from "src/modules/common/cloudinary/upload/upload.module"
import { UploadService } from "src/modules/common/cloudinary/upload/upload.service"
import { CloudinaryModule } from "src/modules/common/cloudinary/cloudinary.module"
import { GetAllMedicineClassifyManagerController } from "./controllers/getAllMedicineClassify.manager.controller"
import { GetAllMedicineClassifyManagerService } from "./services/getAllMedicineClassify.manager.service"
import { CreateMedicineClassifyManagerService } from "./services/create.medicineClassify.service"
import { CreateMedicineClassifyManagerController } from "./controllers/create.medicineClassify.controller"



const httpController = [
    CreateMedicineManagerController,
    GetAllMedicineClassifyManagerController,
    CreateMedicineClassifyManagerController
]

const Services = [
    CreateMedicineManagerService,
    GetAllMedicineClassifyManagerService,
    CreateMedicineClassifyManagerService,
    UploadService,
    JwtService
]


@Module({
    imports: [PrismaModule, UploadModule, CloudinaryModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicineManagerModule { }
