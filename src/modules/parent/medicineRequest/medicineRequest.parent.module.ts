import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { CreateMedicineRequestParentController } from "./controllers/create.medicineRequest.parent.controller"
import { CreateMedicineRequestParentService } from "./services/create.medicineRequest.parent.service"
import { GetDetailStudentAdminService } from "src/modules/admin/student/services/get-detail-student.admin.service"
import { StudentAdminModule } from "src/modules/admin/student/student.admin.module"
import { GetAllMedicineRequestParentService } from "./services/getAll.medicineRequest.paremt.service"
import { GetAllMedicineRequestParentController } from "./controllers/getAll.medicineRequest.parent.controller"
import { DeleteMedicineRequestParentController } from "./controllers/delete.medicineRequest.parent.controller"
import { DeleteMedicineRequestParentService } from "./services/delete.medicineRequest.parent.service"


const httpController = [
    CreateMedicineRequestParentController,
    GetAllMedicineRequestParentController,
    DeleteMedicineRequestParentController
]

const Services = [
    CreateMedicineRequestParentService,
    GetAllMedicineRequestParentService,
    DeleteMedicineRequestParentService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicineRequestParentModule { }
