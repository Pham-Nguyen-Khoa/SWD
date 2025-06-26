import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailCheckUpManagerService } from "../services/getDetail.checkUp.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_DETAIL_CHECK_UP.parent}`)
@Controller(routesV1.versionManager)

export class GetDetailCheckUpManagerController {
    constructor(
        private readonly GetDetailCheckUpManagerService: GetDetailCheckUpManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_DETAIL_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc khám sức khỏe định kỳ",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.checkUp.getOne)
    async getDetail(@Param('id') id: string) {
        return await this.GetDetailCheckUpManagerService.getDetail(+id)
    }
}

