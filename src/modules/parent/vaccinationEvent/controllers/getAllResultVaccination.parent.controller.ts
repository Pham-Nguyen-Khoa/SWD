

import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllVaccinationEventParentService } from "../services/getAllVaccinationEvent.parent.service";
import { GetAllResultVaccinationEventParentService } from "../services/getAllResultVaccination.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.GET_ALL_RESULT_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionParent)


export class GetAllResultVaccinationEventParentController {
    constructor(
        private readonly getAllResultVaccinationEventParentService: GetAllResultVaccinationEventParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.GET_ALL_RESULT_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.parent.vaccinationEvent.resultVaccinationEvent)
    async getAllResult(@GetUser() user) {
        return await this.getAllResultVaccinationEventParentService.getAllResult(user)
    }
}

