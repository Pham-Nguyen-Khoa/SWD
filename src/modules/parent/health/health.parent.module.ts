import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { CreateHealthProfileParentController } from "./controllers/create.health.parent.controller"
import { CreateHealthProfileParentService } from "./services/create.health.parent.service"
import { GetAllHealthProfileParentController } from "./controllers/getAll.health.parent.controller"
import { GetAlLHealthProfileParentService } from "./services/getAll.health.parent.service"
import { GetDetailHealthProfileParentController } from "./controllers/getDetail.health.parent.controller"
import { GetDetailHealthParentService } from "./services/getDetail.health.parent.service"
import { FromDataHealthProfileParentController } from "./controllers/form-data.health.parent.controller"
import { FormDataHealthParentService } from "./services/formData.health.parent.service"
import { UpdateHealthProfileParentController } from "./controllers/update.health.parent.controller"
import { UpdateHealthProfileParentService } from "./services/update.health.parent.service"
import { StudentParentController } from "./controllers/student.parent.controller"
import { StudentParentService } from "./services/student.parent.service"

const httpController = [
    FromDataHealthProfileParentController,
    CreateHealthProfileParentController,
    UpdateHealthProfileParentController,
    GetAllHealthProfileParentController,
    GetDetailHealthProfileParentController,
    StudentParentController
]

const Services = [
    CreateHealthProfileParentService,
    UpdateHealthProfileParentService,
    GetAlLHealthProfileParentService,
    GetDetailHealthParentService,
    FormDataHealthParentService,
    StudentParentService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
    exports: [StudentParentService]
})
export class HealthParentModule { }
