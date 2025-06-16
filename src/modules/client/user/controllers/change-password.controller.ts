import { Body, Controller, Get, Param, Patch, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { GetProfileService } from "../services/getProfile.user.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { UserIdExistsPipe } from "../pipes/user-id-exists.pipe";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ChangePasswordService } from "../services/change-password.service";
import { ChangePasswordDto } from "../dto/change-password.dto";



@ApiTags(`${resourcesV1.User.root} - ${resourcesV1.User.CHANGE_PASSWORD.parent}`)
@Controller(routesV1.versionClient)

export class ChangePasswordController {
    constructor(
        private readonly changePasswordService: ChangePasswordService
    ) { }
    @ApiOperation({ summary: resourcesV1.User.CHANGE_PASSWORD.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2, 3, 4, 5)
    @Patch(routesV1.client.user.changePassword)
    async changePassword(@Body() data: ChangePasswordDto, @GetUser() user) {
        return await this.changePasswordService.changePassword(data, user)
    }
}