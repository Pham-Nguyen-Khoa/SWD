import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { CreateMedicalEventNurseDTO } from "../dtos/create.medicalEvent.nurse.dto";
import { CreateMedicalEventNurseService } from "../services/create.medicalEvent.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.CREATE_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionNurse)


export class CreateMedicalEventNurseController {
    constructor(
        private readonly createMedicalEventNurseService: CreateMedicalEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.CREATE_MEDICAL_EVENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.medicalEvent.root)
    async create(@Body() data: CreateMedicalEventNurseDTO, @GetUser() user) {
        return await this.createMedicalEventNurseService.create(data, user)
    }
}

