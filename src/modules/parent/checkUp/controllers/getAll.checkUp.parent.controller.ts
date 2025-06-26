import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllCheckUpParentService } from "../services/getAll.checkUp.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.GET_ALL_CHECK_UP.parent}`)
@Controller(routesV1.versionParent)


export class GetAllCheckUpParentController {
    constructor(
        private readonly getAllCheckUpParentService: GetAllCheckUpParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.GET_ALL_CHECK_UP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.parent.checkUp.root)
    async getAll(@GetUser() user) {
        return await this.getAllCheckUpParentService.getAll(user)
    }
}

