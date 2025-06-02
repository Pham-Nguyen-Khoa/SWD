import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetDetailResultVaccinationEventNurseService } from "../services/getDetailResultVaccinationEvent.nurse.service";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_DETAIL_RESULT_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionNurse)

export class GetDetailResultVaccinationEventNurseController {
    constructor(
        private readonly getDetailResultVaccinationEventNurseService: GetDetailResultVaccinationEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_DETAIL_RESULT_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc tiêm chủng muốn lấy  ghi nhận kết quả",
        example: 1,
        type: Number
    })

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.vaccinationEvent.result)
    async result(@Param('id') id: string) {
        return await this.getDetailResultVaccinationEventNurseService.getDetail(+id)
    }
}

