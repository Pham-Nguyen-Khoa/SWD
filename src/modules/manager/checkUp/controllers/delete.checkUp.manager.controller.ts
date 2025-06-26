import { Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { DeleteCheckUpManagerService } from "../services/delete.checkUp.manager.service";

@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.DELETE_CHECK_UP.parent}`)
@Controller(routesV1.versionManager)

export class DeleteCheckUpManagerController {
    constructor(
        private readonly deleteCheckUpManagerService: DeleteCheckUpManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.DELETE_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của khám sức khỏe định kỳ cần xóa",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Delete(routesV1.manager.checkUp.getOne)
    async delete(@Param('id') id: string) {
        return await this.deleteCheckUpManagerService.delete(+id)
    }
}

