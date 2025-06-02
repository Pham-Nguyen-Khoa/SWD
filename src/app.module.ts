import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './libs/prisma/prisma.module';
import { UserModule } from './modules/client/user/user.module';
import { UserAdminModule } from './modules/admin/user/user.admin.module';
import { StudentAdminModule } from './modules/admin/student/student.admin.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledModule } from './modules/common/schedules/schedules.module';
import { HealthParentModule } from './modules/parent/health/health.parent.module';
import { HealthNurseModule } from './modules/nurse/health/health.nurse.module';
import { VaccinationEventModule } from './modules/manager/vaccinationEvent/vaccinationEvent.module';
import { VaccinationEventNurseModule } from './modules/nurse/vaccinationEvent/vaccinationEvent.module';
import { VaccinationEventParentModule } from './modules/parent/vaccinationEvent/vaccinationEvent.module';

@Module({
  imports: [
    // Config ENV 
    ConfigModule.forRoot({
      isGlobal: true
    }),

    /* ----------------Module---------------- */
    AuthModule,
    // Admin      
    UserAdminModule,
    StudentAdminModule,
    // Client 
    UserModule,
    // Parent 
    HealthParentModule,
    VaccinationEventParentModule,
    // Nurse 
    HealthNurseModule,
    VaccinationEventNurseModule,
    // Manager 
    VaccinationEventModule,

    /* ---------------- End Module---------------- */

    /* Cron tự động*/
    ScheduleModule.forRoot(),
    ScheduledModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
