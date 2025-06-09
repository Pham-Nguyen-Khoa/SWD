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
import { UpdateMedicineManagerService } from "./services/update.medicine.manager.service"
import { UpdateMedicineManagerController } from "./controllers/update.medicine.manager.controller"
import { GetDetailMedicineClassifyManagerService } from "./services/getDetailMedicineClassify.manager.service"
import { GetDetailMedicineClassifyManagerController } from "./controllers/getDetailMedicineClassify.manager.controller"
import { DeleteMedicineClassifyManagerController } from "./controllers/delete.medicineClassify.manager.controller"
import { DeleteMedicineClassifyManagerService } from "./services/delete.medicineClassify.manager.service"
import { DeleteMedicineManagerController } from "./controllers/delete.medicine.manager.controller"
import { DeleteMedicineManagerService } from "./services/delete.medicine.manager.service"



const httpController = [
    CreateMedicineManagerController,
    GetAllMedicineClassifyManagerController,
    CreateMedicineClassifyManagerController,
    GetDetailMedicineClassifyManagerController,
    DeleteMedicineClassifyManagerController,
    DeleteMedicineManagerController,
    UpdateMedicineManagerController
]

const Services = [
    CreateMedicineManagerService,
    GetAllMedicineClassifyManagerService,
    GetDetailMedicineClassifyManagerService,
    CreateMedicineClassifyManagerService,
    UpdateMedicineManagerService,
    DeleteMedicineClassifyManagerService,
    DeleteMedicineManagerService,
    UploadService,
    JwtService
]


@Module({
    imports: [PrismaModule, UploadModule, CloudinaryModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicineManagerModule { }
