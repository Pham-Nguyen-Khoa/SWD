import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { resourcesV1 } from 'src/configs/app.permission';
import { routesV1 } from 'src/configs/app.routes';
import { Roles } from 'src/modules/auth/guards/roles.decorator';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
@ApiTags(`${resourcesV1.Admin.root} - Setting`)
@Controller(routesV1.versionAdmin)
export class SettingController {
  constructor(private readonly settingService: SettingService) { }

  @ApiOperation({ summary: 'Post setting' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(1)
  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }


  @ApiOperation({ summary: 'Get All setting' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(1)
  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @ApiOperation({ summary: 'Get one setting' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(1)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update setting' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(1)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(+id, updateSettingDto);
  }

  @ApiOperation({ summary: 'Delete setting' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingService.remove(+id);
  }
}
