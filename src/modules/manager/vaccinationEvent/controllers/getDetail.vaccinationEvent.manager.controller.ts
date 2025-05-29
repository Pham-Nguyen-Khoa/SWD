import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailVaccinationEventManagerService } from "../services/getDetail.vaccinationEvent.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_DETAIL_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionManager)

export class GetDetailVaccinationEventManagerController {
    constructor(
        private readonly getDetailVaccinationEventManagerService: GetDetailVaccinationEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_DETAIL_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Tiêm chủng",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.vaccinationEvent.getOne)
    async getDetail(@Param('id') id: string) {
        return await this.getDetailVaccinationEventManagerService.getDetail(+id)
    }
}

