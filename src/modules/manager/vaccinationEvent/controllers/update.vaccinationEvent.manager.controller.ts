import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { CreateVaccinationEventManagerService } from "../services/create.vaccinationEvent.manager.service";
import { CreateVaccinationEventDTO } from "../dtos/create.vaccinationEvent.manager.dto";
import { UpdateVaccinationEventDTO } from "../dtos/update.vaccinationEvent.manager.dto";
import { UpdateVaccinationEventManagerService } from "../services/update.vaccinationEvent.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.UPDATE_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionManager)

export class UpdateVaccinationEventManagerController {
    constructor(
        private readonly updateVaccinationEventManagerService: UpdateVaccinationEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.UPDATE_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Tiêm chủng",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Put(routesV1.manager.vaccinationEvent.getOne)
    async update(@Param('id') id: string, @Body() data: UpdateVaccinationEventDTO, @GetUser() user) {
        return await this.updateVaccinationEventManagerService.update(+id, data, user)
    }
}

