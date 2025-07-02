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
import { MedicineManagerModule } from './modules/manager/medicine/medicine.manager.module';
import { UploadModule } from './modules/common/cloudinary/upload/upload.module';
import { MedicineNurseModule } from './modules/nurse/medicine/medicine.nurse.module';
import { MedicineSupplyManagerModule } from './modules/manager/medicineSupply/medicineSupply.manager.module';
import { RequestModule } from './modules/manager/request/request.manager.module';
import { MedicalEventNurseModule } from './modules/nurse/medicalEvent/medicalEvent.nurse.module';
import { MedicalEventManagerModule } from './modules/manager/medicalEvent/medicalEvent.manager.module';
import { MedicineRequestParentModule } from './modules/parent/medicineRequest/medicineRequest.parent.module';
import { MedicineRequestNurseModule } from './modules/nurse/medicineRequest/medicineRequest.nurse.module';
import { AiAdminModule } from './modules/admin/AI/user.admin.module';
import { AIModule } from './modules/common/ai/ai.module';
import { CheckUpManagerModule } from './modules/manager/checkUp/checkUp.manager.module';
import { CheckUpParentModule } from './modules/parent/checkUp/checkUp.module';
import { checkUpNurseModule } from './modules/nurse/checkUp/checkUp.nurse.module';
import { SettingModule } from './modules/admin/setting/setting.module';
import { MeetingParentModule } from './modules/parent/meeting/meeting.module';

@Module({
  imports: [
    // Config ENV 
    ConfigModule.forRoot({
      isGlobal: true
    }),

    /* ----------------Module---------------- */
    AuthModule,
    AIModule,
    // Admin      
    UserAdminModule,
    StudentAdminModule,
    AiAdminModule,
    // Client 
    UserModule,
    // Parent 
    HealthParentModule,
    VaccinationEventParentModule,
    MedicineRequestParentModule,
    MeetingParentModule,
    CheckUpParentModule,
    // Nurse 
    HealthNurseModule,
    VaccinationEventNurseModule,
    MedicineNurseModule,
    MedicalEventNurseModule,
    MedicineRequestNurseModule,
    checkUpNurseModule,
    // Manager 
    VaccinationEventModule,
    MedicineManagerModule,
    MedicineSupplyManagerModule,
    RequestModule,
    MedicalEventManagerModule,
    CheckUpManagerModule,


    UploadModule,
    SettingModule,

    /* ---------------- End Module---------------- */

    /* Cron tự động*/
    ScheduleModule.forRoot(),
    ScheduledModule,
    PrismaModule,
    SettingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
