import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllRequestService } from "../services/getAllRequest.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_ALL_REQUEST.parent}`)
@Controller(routesV1.versionManager)

export class GetAllRequestController {
    constructor(
        private readonly getAllRequestService: GetAllRequestService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_ALL_REQUEST.displayName })
    @ApiBearerAuth()
    @Get(routesV1.manager.request.root)
    async allRequest() {
        return await this.getAllRequestService.allRequest();
    }
}

