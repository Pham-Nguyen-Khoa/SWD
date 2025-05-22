import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetAllUserAdminService } from "../services/get.all.users.admin.service";
import { GetAllUserQuery } from "../dto/get.all.users.query.dto";


@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.GET_ALL_USERS.parent}`)
@Controller(routesV1.versionAdmin)

export class GetAllUserAdminController {
    constructor(
        private readonly getAllUserService: GetAllUserAdminService

    ) {
    }
    @ApiOperation({ summary: resourcesV1.Admin.GET_ALL_USERS.displayName })
    @ApiBearerAuth()
    // @UseGuards(JWTGuard, RolesGuard) 
    @Roles(1,2,3)
    @Get(routesV1.admin.user.root)
    async getAllUser(@Query() query: GetAllUserQuery) {
        return await this.getAllUserService.getAll(query)
    }

}