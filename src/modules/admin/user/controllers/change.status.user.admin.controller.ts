import { Body, Controller, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { CreateUserDto } from "../dto/create.user.admin.dto";
import { CreateUserService } from "../services/create.user.admin.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ChangeStatusUserAdminService } from "../services/change.status.user.admin.service";
import { ChangeAccountStatusDto } from "../dto/change-status.admin.dto";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.UPDATE_STATUS_USER.parent}`)
@Controller(routesV1.versionAdmin)

export class ChangeStatusUserAdminController {
    constructor(
        private readonly updateStatusService: ChangeStatusUserAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.UPDATE_STATUS_USER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Put(routesV1.admin.user.changeStatus)
    @ApiParam({
        name: 'id',
        description: 'ID của account cần đổi trạng thái',
        example: 1,
    })
    @ApiParam({
        name: 'status',
        type: String,
        description: 'Trạng thái cập nhật ( ACTIVE, BLOCK )',
        example: "ACTIVE",
    })
    async updateStatus(@Param('id') id: string, @Param('status') status: string, @GetUser() user) {
        const data = {
            id: Number(id), 
            status
        }
        return await this.updateStatusService.changeStatus(data, user)
    }
}