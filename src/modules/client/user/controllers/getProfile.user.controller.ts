import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { GetProfileService } from "../services/getProfile.user.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { UserIdExistsPipe } from "../pipes/user-id-exists.pipe";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";



@ApiTags(`${resourcesV1.User.root} - ${resourcesV1.User.GET_PROFILE.parent}`)
@Controller(routesV1.versionClient)

export class GetProfileController {
    constructor(
        private readonly getProfileService: GetProfileService
    ) { }


    @ApiOperation({ summary: resourcesV1.User.GET_PROFILE.displayName })
    @ApiBearerAuth()

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1,2,3,4,5)
    @Get(routesV1.client.user.profile)
    async getProfile(@GetUser() user) {
        return this.getProfileService.getProfile(user)
    }

}