import { Module } from "@nestjs/common"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { JwtService } from "@nestjs/jwt"
import { StudentAdminModule } from "src/modules/admin/student/student.admin.module"
import { MailService } from "src/modules/common/mail/mail.service"
import { CreateCheckUpManagerController } from "./controllers/create.checkUp.manager.controller"
import { CreateCheckUpManagerService } from "./services/create.checkUp.manager.service"
import { GetAllCheckUpManagerService } from "./services/getAll.checkUp.manager.service"
import { GetAllCheckUpManagerController } from "./controllers/getAll.checkUp.manager.controller"
import { ConfirmCheckUpManagerController } from "./controllers/confirm.checkUp.manager.controller"
import { ConfirmCheckUpManagerService } from "./services/confirm.checkUp.manager.service"
import { GetDetailCheckUpManagerService } from "./services/getDetail.checkUp.manager.service"
import { GetDetailCheckUpManagerController } from "./controllers/getDetail.checkUp.manager.controller"
import { DeleteCheckUpManagerController } from "./controllers/delete.checkUp.manager.controller"
import { DeleteCheckUpManagerService } from "./services/delete.checkUp.manager.service"
import { UpdateCheckUpManagerService } from "./services/update.checkUp.manager.service"
import { UpdateCheckUpManagerController } from "./controllers/update.checkUp.manager.controller"
import { SuccessCheckUpManagerService } from "./services/success.checkUp.manager.service"
import { SuccessCheckUpManagerController } from "./controllers/success.checkUp.manager.controller"
const httpController = [
    CreateCheckUpManagerController,
    GetAllCheckUpManagerController,
    ConfirmCheckUpManagerController,
    GetDetailCheckUpManagerController,
    DeleteCheckUpManagerController,
    UpdateCheckUpManagerController,
    SuccessCheckUpManagerController,
]
const Services = [
    CreateCheckUpManagerService,
    GetAllCheckUpManagerService,
    ConfirmCheckUpManagerService,
    GetDetailCheckUpManagerService,
    DeleteCheckUpManagerService,
    UpdateCheckUpManagerService,
    SuccessCheckUpManagerService,
    MailService,
    JwtService
]


@Module({
    imports: [PrismaModule, StudentAdminModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class CheckUpManagerModule { }
