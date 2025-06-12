import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetAllRequestManagerNurseService } from "../services/getAllRequestManager.nurse.service";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailRequestManagerNurseService } from "../services/getDetailRequestManager.nurse.service";

@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_DETAIL_SEND_REQUEST_MANAGER.parent}`)
@Controller(routesV1.versionNurse)

export class GetDetailSendRequestManagerNurseController {
    constructor(
        private readonly getDetailRequestManagerNurseService: GetDetailRequestManagerNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_DETAIL_SEND_REQUEST_MANAGER.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của yêu cầu muốn xem chi tiết",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2, 3)
    @Get(routesV1.nurse.medicine.getDetailSendRequest)
    async getDetailSendRequest(@Param('id') id: string, @GetUser() user) {
        return await this.getDetailRequestManagerNurseService.getDetailRequest(+id, user)
    }
}

