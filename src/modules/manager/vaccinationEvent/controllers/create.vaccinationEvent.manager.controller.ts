import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { CreateVaccinationEventManagerService } from "../services/create.vaccinationEvent.manager.service";
import { CreateVaccinationEventDTO } from "../dtos/create.vaccinationEvent.manager.dto";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.CREATE_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionManager)

export class CreateVaccinationEventManagerController {
    constructor(
        private readonly createVaccinationEventManagerService: CreateVaccinationEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.CREATE_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Post(routesV1.manager.vaccinationEvent.root)
    async create(@Body() data: CreateVaccinationEventDTO, @GetUser() user) {
        return await this.createVaccinationEventManagerService.create(data,user)
    }
}

