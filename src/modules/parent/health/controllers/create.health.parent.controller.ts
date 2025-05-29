import { CreateHealthProfileParentService } from './../services/create.health.parent.service';
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateHealthProfileDTO } from '../dtos/create.health.parent.dto';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.CREATE_HEALTH_PROFILE.parent}`)
@Controller(routesV1.versionParent)


export class CreateHealthProfileParentController {
    constructor(
        private readonly createHealthProfileParentService: CreateHealthProfileParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.CREATE_HEALTH_PROFILE.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Post(routesV1.parent.health.root)
    async create(@Body() data: CreateHealthProfileDTO,@GetUser() user) {
        return await this.createHealthProfileParentService.create(data,user)
    }
}
