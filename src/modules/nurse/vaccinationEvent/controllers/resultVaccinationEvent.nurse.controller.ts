import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ResultVaccinationEventNurseDto } from "../dtos/resultVaccinationEvent.nurse.dto";
import { ResultVaccinationEventNurseService } from "../services/resultVaccinationEvent.nurse.service";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.RESULT_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionNurse)

export class ResultVaccinationEventNurseController {
    constructor(
        private readonly resultVaccinationEventNurseService: ResultVaccinationEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.RESULT_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc tiêm chủng muốn ghi nhận kết quả",
        example: 1,
        type: Number
    })

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.vaccinationEvent.result)
    async result(@Param('id') id: string, @Body() data: ResultVaccinationEventNurseDto, @GetUser() user) {
        return await this.resultVaccinationEventNurseService.result(+id, data, user)
    }
}

