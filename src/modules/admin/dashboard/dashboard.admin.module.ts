import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { MedicalEventDashboardAdminController } from './controllers/medicalEvent.dashboard.admin.controller';
import { MedicalEventDashBoardAdminService } from './services/medicalEvent.dashboard.admin.service';
import { HealthProfileDashboardAdminController } from './controllers/healthProfille.dashboard.admin.controller';
import { HealthProfileDashBoardAdminService } from './services/healthProfille.dashboard.admin.service';
const httpController = [
    MedicalEventDashboardAdminController,
    HealthProfileDashboardAdminController
]

const Services = [
    MedicalEventDashBoardAdminService,
    HealthProfileDashBoardAdminService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class DashboardAdminModule { }
