import { Body, Controller, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { CreateUserDto } from "../dto/create.user.admin.dto";
import { CreateUserService } from "../services/create.user.admin.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateUserDto } from "../dto/update.user.admin.dto";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.UPDATE_USER.parent}`)
@Controller(routesV1.versionAdmin)

export class UpdateUserAdminController {
    constructor(
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.UPDATE_USER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Patch(routesV1.admin.user.getOne)
    // async create(@Body() data: CreateUserDto, @GetUser() user) {
    async update(@Body() data: UpdateUserDto, @GetUser() user) {
    }
}