import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SettingController],
  providers: [SettingService, JwtService],
})
export class SettingModule { }
