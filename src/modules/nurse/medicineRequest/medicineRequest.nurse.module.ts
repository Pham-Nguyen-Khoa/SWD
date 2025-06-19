import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { JwtService } from "@nestjs/jwt"
import { GetAllMedicineRequestNurseController } from "./controllers/getAll.medicineRequest.nurse.controller"
import { GetAllMedicineRequestNurseService } from "./services/getAll.medicineRequest.nurse.service"
import { StudentAdminModule } from "src/modules/admin/student/student.admin.module"
import { GetDetailMedicineRequestNurseService } from "./services/getDetail.medicineRequest.nurse.service"
import { GetDetailMedicineRequestNurseController } from "./controllers/getDetail.medicineRequest.nurse.controller"
import { AcceptMedicineRequestNurseController } from "./controllers/accept.medicineRequest.nurse.controller"
import { AcceptedMedicineRequestNurseService } from "./services/accept.medicineRequest.nurse.service"
import { RejectMedicineRequestNurseController } from "./controllers/reject.medicineRequest.nurse.controller"
import { RejectedMedicineRequestNurseService } from "./services/reject.medicineRequest.nurse.service"
import { MailService } from "src/modules/common/mail/mail.service"
import { RecievedMedicineRequestNurseService } from "./services/received.medicineRequest.nurse.service"
import { ReceivedMedicineRequestNurseController } from "./controllers/received.medicineRequest.nurse.controller"


const httpController = [
    GetAllMedicineRequestNurseController,
    GetDetailMedicineRequestNurseController,
    AcceptMedicineRequestNurseController,
    RejectMedicineRequestNurseController,
    ReceivedMedicineRequestNurseController
]

const Services = [
    GetAllMedicineRequestNurseService,
    GetDetailMedicineRequestNurseService,
    AcceptedMedicineRequestNurseService,
    RejectedMedicineRequestNurseService,
    RecievedMedicineRequestNurseService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class MedicineRequestNurseModule { }
