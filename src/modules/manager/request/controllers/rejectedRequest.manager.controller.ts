import { Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { ApproveRequestManagerService } from "../services/approveRequest.manager.service";
import { RejectedRequestManagerService } from "../services/rejectedRequest.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.REJECTED_REQUEST.parent}`)
@Controller(routesV1.versionManager)

export class RejectedRequestManagerController {
    constructor(
        private readonly rejectedRequestManagerService: RejectedRequestManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.REJECTED_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Yêu cầu muốn từ chối",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Put(routesV1.manager.request.getOne)
    async reject(@Param('id') id: string) {
        return await this.rejectedRequestManagerService.reject(+id)
    }
}

