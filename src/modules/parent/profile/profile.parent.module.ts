import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { UpdatedProfileParentController } from "./controllers/updateProfile.parent.controller"
import { UpdatedProfileParentService } from "./services/updateProfile.parent.service"


const httpController = [
    UpdatedProfileParentController
]

const Services = [
    UpdatedProfileParentService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class ProfileParentModule { }
