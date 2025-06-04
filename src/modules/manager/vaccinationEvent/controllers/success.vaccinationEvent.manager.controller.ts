import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { SuccessVaccinationEventManagerService } from "../services/success.vaccinationEvent.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.SUCCESS_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionManager)

export class SuccessVaccinationEventManagerController {
    constructor(
        private readonly successVaccinationEventManager: SuccessVaccinationEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.SUCCESS_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Tiêm chủng muốn hoàn tất",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Patch(routesV1.manager.vaccinationEvent.success)
    async succes(@Param('id') id: string, @GetUser() user) {
        return await this.successVaccinationEventManager.success(+id, user)
    }
}

