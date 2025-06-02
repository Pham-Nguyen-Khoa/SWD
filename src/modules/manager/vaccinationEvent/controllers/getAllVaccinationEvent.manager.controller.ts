import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllVaccinationEventManagerService } from "../services/getAllVaccinationEvent.manager.service";





@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_ALL_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionManager)


export class GetAllVaccinationEventNurseController {
    constructor(
        private readonly getAllVaccinationEventManagerService: GetAllVaccinationEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_ALL_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(2)
    @Get(routesV1.manager.vaccinationEvent.root)
    async getAll() {
        return await this.getAllVaccinationEventManagerService.getAll();
    }
}

