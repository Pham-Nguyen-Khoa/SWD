import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { CreateUserDto } from "../dto/create.user.admin.dto";
import { CreateUserService } from "../services/create.user.admin.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.CREATE_USER.parent}`)
@Controller(routesV1.versionAdmin)

export class CreateUserAdminController {
    constructor(
        private readonly createUserService: CreateUserService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.CREATE_USER.displayName })
    @ApiBearerAuth()

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Post(routesV1.admin.user.root)
    async create(@Body() data: CreateUserDto, @GetUser() user) {
        return await this.createUserService.create(data, user)
    }
}