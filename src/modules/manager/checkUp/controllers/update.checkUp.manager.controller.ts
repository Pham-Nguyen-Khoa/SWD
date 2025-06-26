import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateCheckUpDTO } from "../dtos/update.checkUp.manager.dto";
import { UpdateCheckUpManagerService } from "../services/update.checkUp.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.UPDATE_CHECK_UP.parent}`)
@Controller(routesV1.versionManager)

export class UpdateCheckUpManagerController {
    constructor(
        private readonly updateCheckUpManagerService: UpdateCheckUpManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.UPDATE_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc khám sức khỏe định kỳ muốn cập nhật",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Patch(routesV1.manager.checkUp.getOne)
    async update(@Body() data: UpdateCheckUpDTO, @Param('id') id: string, @GetUser() user) {
        return await this.updateCheckUpManagerService.update(data, +id, user)
    }
}

