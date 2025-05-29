import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateHealthProfileDTO } from '../dtos/create.health.parent.dto';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { UpdateHealthProfileParentService } from "../services/update.health.parent.service";
import { UpdateHealthProfileDTO } from "../dtos/update.health.parent.dto";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.UPDATE_HEALTH_PROFILE.parent}`)
@Controller(routesV1.versionParent)


export class UpdateHealthProfileParentController {
    constructor(
        private readonly updateHealthProfileParentService: UpdateHealthProfileParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.UPDATE_HEALTH_PROFILE.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Hồ sơ học sinh",
        example: 1,
        type: Number
    })

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Put(routesV1.parent.health.getOne)
    async update(@Param('id') id: string, @Body() data: UpdateHealthProfileDTO, @GetUser() user) {
        return await this.updateHealthProfileParentService.update(+id, data, user)
    }
}
