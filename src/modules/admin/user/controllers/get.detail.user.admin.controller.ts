import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { GetDetailUserAdminService } from "../services/get.detail.user.admin.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";


@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.GET_DETAIL_USER.parent}`)
@Controller(routesV1.versionAdmin)


export class GetDetailUserAdminController {
    constructor(
        private readonly getDetailService: GetDetailUserAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.GET_DETAIL_USER.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'ID của user cần lấy chi tiết',
        example: 1,
    })
    // @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Get(routesV1.admin.user.getOne)
    async getDetailUser(@Param('id') id: number) {
        return await this.getDetailService.getDetailUser(+id)
        // return "Lấy chi tiết user"
    }

}
