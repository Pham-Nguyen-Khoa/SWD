import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailVaccinationEventNurseService } from "../services/getDetail.vaccinationEvent.nurse.service";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_DETAIL_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionNurse)

export class GetDetailVaccinationEventNurseController {
    constructor(
        private readonly getDetailVaccinationEventNurseService: GetDetailVaccinationEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_DETAIL_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Tiêm chủng",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.vaccinationEvent.getOne)
    async getDetail(@Param('id') id: string) {
        return await this.getDetailVaccinationEventNurseService.getDetail(+id)
    }
}

