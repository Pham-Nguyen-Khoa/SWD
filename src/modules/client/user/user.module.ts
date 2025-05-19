import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { GetProfileController } from './controllers/getProfile.user.controller';
import { GetProfileService } from './services/getProfile.user.service';
import { JwtService } from '@nestjs/jwt';
import { UserQueryService } from './services/user-query.service';



const httpController = [
  GetProfileController
]

const Services = [
  GetProfileService,
  JwtService,
  UserQueryService
]


@Module({
  imports: [PrismaModule],
  controllers: [...httpController],
  providers: [...Services],
})
export class UserModule { }
