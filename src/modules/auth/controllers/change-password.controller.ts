import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginService } from "../services/login.service";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dto/login.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ChangePasswordService } from "../services/change-password.service";
import { JWTGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../guards/roles.decorator";
import { GetUser } from "../guards/get-user.decorator";


@ApiTags(
    `${resourcesV1.CHANGE_PASSWORD.parent}`,
)
@Controller(routesV1.versionClient)
export class ChangePasswordController {
    constructor(
        private readonly changePasswordService: ChangePasswordService
    ) { }

    @ApiOperation({ summary: resourcesV1.CHANGE_PASSWORD.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2, 3, 4, 5)
    @Post(routesV1.auth.changePassword)
    async changePassword(@Body() data: ChangePasswordDto,@GetUser() user) {
        return await this.changePasswordService.changePassword(data,user)
    }
}