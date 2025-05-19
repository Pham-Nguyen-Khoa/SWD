import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { RefreshTokenController } from './controllers/refresh-token.controller';
import { RefreshService } from './services/refresh-token.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';


const httpController = [
  LoginController,
  RegisterController,
  RefreshTokenController
]

const Services = [
  LoginService,
  RegisterService,
  RefreshService,
  JwtService
]

@Module({
  imports: [PrismaModule],
  controllers: [...httpController],
  providers: [...Services],
})
export class AuthModule { }     
