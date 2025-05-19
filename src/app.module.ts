import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './libs/prisma/prisma.module';
import { UserModule } from './modules/client/user/user.module';
import { UserAdminModule } from './modules/admin/user/user.admin.module';
import { StudentAdminModule } from './modules/admin/student/student.admin.module';

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

    /* ---------------- End Module---------------- */

    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
