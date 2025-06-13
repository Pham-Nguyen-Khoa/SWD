import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { DetailRequestManagerService } from "../services/getDetailRequest.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_DETAIL_REQUEST.parent}`)
@Controller(routesV1.versionManager)

export class GetDetailRequestManagerController {
    constructor(
        private readonly detailRequestManagerService: DetailRequestManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_DETAIL_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Yêu cầu",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.request.getOne)
    async getDetail(@Param('id') id: string) {
        return await this.detailRequestManagerService.detail(+id)
    }
}

