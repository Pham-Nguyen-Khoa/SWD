import { ChangeStatusUserAdminController } from './controllers/change.status.user.admin.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { CreateUserAdminController } from './controllers/create.user.admin.controller';
import { CreateUserService } from './services/create.user.admin.service';
import { GetAllUserAdminController } from './controllers/get.all.users.admin.controller';
import { GetAllUserAdminService } from './services/get.all.users.admin.service';
import { GetDetailUserAdminController } from './controllers/get.detail.user.admin.controller';
import { GetDetailUserAdminService } from './services/get.detail.user.admin.service';
import { ChangeStatusUserAdminService } from './services/change.status.user.admin.service';
import { DeleteUserAdminController } from './controllers/delete.user.admin.controller';
import { DeleteUserAdminService } from './services/delete.user.admin.service';
import { UpdateUserAdminService } from './services/update.account.admin.service';
import { UpdateUserAdminController } from './controllers/update.account.admin.controller';



const httpController = [
    CreateUserAdminController,
    GetAllUserAdminController,
    GetDetailUserAdminController,
    ChangeStatusUserAdminController,
    UpdateUserAdminController,
    DeleteUserAdminController
]

const Services = [
    CreateUserService,
    GetAllUserAdminService,
    GetDetailUserAdminService,
    ChangeStatusUserAdminService,
    DeleteUserAdminService,
    UpdateUserAdminService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class UserAdminModule { }
