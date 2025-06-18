import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetDetailMedicalEventManagerService } from "../services/getDetail.medicalEvent.manager.service";





@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_DETAIL_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionManager)


export class GetDetailMedicalEventManagerController {
    constructor(
        private readonly getDetailMedicalEventManagerService: GetDetailMedicalEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_DETAIL_MEDICAL_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Sự kiện y tế muốn lấy chi tiết",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.medicalEvent.getOne)
    async getDetail(@Param('id') id: string) {
        return await this.getDetailMedicalEventManagerService.getDetail(+id)
    }
}

