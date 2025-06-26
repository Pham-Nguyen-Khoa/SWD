import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { CreateCheckUpManagerService } from "../services/create.checkUp.manager.service";
import { CreateHealthCheckupDTO } from "../dtos/create.checkUp.manager.dto";





@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.CREATE_CHECK_UP.parent}`)
@Controller(routesV1.versionManager)


export class CreateCheckUpManagerController {
    constructor(
        private readonly createCheckUpManagerService: CreateCheckUpManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.CREATE_CHECK_UP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Post(routesV1.manager.checkUp.root)
    async create(@Body() data: CreateHealthCheckupDTO, @GetUser() user) {
        return await this.createCheckUpManagerService.create(data, user)
    }
}

