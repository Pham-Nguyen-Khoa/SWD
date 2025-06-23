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
import { GetDetailMedicineRequestParentService } from "./services/getDetail.medicineRequest.parent.service"
import { GetDetailMedicineRequestParentController } from "./controllers/getDetail.medicineRequest.parent.controller"
import { StopMedicineRequestParentService } from "./services/stop.medicineRequest.parent.service"
import { StopMedicineRequestParentController } from "./controllers/stop.medicineRequest.parent.controller"
import { AcceptBenefitMedicineRequestParentController } from "./controllers/accept.benefit.medicineRequest.parent.controller"
import { AcceptedMedicineRequestParentService } from "./services/accept.benefit.medicineRequest.parent.service"
import { RejectedMedicineRequestParentService } from "./services/reject.benefit.medicineRequest.parent.service"
import { RejectBenefitMedicineRequestParentController } from "./controllers/reject.benefit.medicineRequest.parent.controller"


const httpController = [
    AcceptBenefitMedicineRequestParentController,
    CreateMedicineRequestParentController,
    GetAllMedicineRequestParentController,
    DeleteMedicineRequestParentController,
    GetDetailMedicineRequestParentController,
    StopMedicineRequestParentController,
    RejectBenefitMedicineRequestParentController

]

const Services = [
    AcceptedMedicineRequestParentService,
    RejectedMedicineRequestParentService,
    CreateMedicineRequestParentService,
    GetAllMedicineRequestParentService,
    DeleteMedicineRequestParentService,
    GetDetailMedicineRequestParentService,
    StopMedicineRequestParentService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicineRequestParentModule { }
