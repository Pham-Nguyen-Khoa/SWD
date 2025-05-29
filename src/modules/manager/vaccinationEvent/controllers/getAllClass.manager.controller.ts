import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailVaccinationEventManagerService } from "../services/getDetail.vaccinationEvent.manager.service";
import { GetAllClassManagerService } from "../services/getAllClass.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_ALL_CLASS.parent}`)
@Controller(routesV1.versionManager)

export class GetAllClassManagerController {
    constructor(
        private readonly getAllClassManagerService: GetAllClassManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_ALL_CLASS.displayName })
    @ApiBearerAuth()
    @Get(routesV1.manager.vaccinationEvent.allClass)
    async allClass() {
        return await this.getAllClassManagerService.getAll()
    }
}

