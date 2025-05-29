import { Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { DeleteVaccinationEventManagerService } from "../services/delete.vaccinationEvent.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.DELETE_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionManager)

export class DeleteVaccinationEventManagerController {
    constructor(
        private readonly deleteVaccinationEventManagerService: DeleteVaccinationEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.DELETE_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Tiêm chủng cần xóa",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Delete(routesV1.manager.vaccinationEvent.getOne)
    async delete(@Param('id') id: string) {
        return await this.deleteVaccinationEventManagerService.delete(+id)
    }
}

