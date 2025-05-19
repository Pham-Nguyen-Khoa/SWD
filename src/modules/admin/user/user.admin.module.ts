import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { CreateUserAdminController } from './controllers/create.user.admin.controller';
import { CreateUserService } from './services/create.user.admin.service';
import { GetAllUserAdminController } from './controllers/get.all.users.admin.controller';
import { GetAllUserAdminService } from './services/get.all.users.admin.service';



const httpController = [
    CreateUserAdminController,
    GetAllUserAdminController
]

const Services = [
    CreateUserService,
    GetAllUserAdminService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class UserAdminModule { }
