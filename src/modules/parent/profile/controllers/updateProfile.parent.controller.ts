import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateProfileParentDto } from "../dtos/updateProfile.parent.dto";
import { UpdatedProfileParentService } from "../services/updateProfile.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.UPDATE_PROFILE_PARENT.parent}`)
@Controller(routesV1.versionParent)


export class UpdatedProfileParentController {
    constructor(
        private readonly updatedProfileParentService: UpdatedProfileParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.UPDATE_PROFILE_PARENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Put(routesV1.parent.profile.root)
    async updateProfile(@GetUser() user, @Body() data: UpdateProfileParentDto) {
        return await this.updatedProfileParentService.updated(user, data)
    }
}

