import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllVaccinationEventNurseService } from "../services/getAllCheckUp.nurse.service";
import { GetResultsCheckUpNurseService } from "../services/getResults.nurse.service";
import { GetDetailResultCheckUpNurseService } from "../services/getDetail.result.checkUp.nurse.service";

@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_DETAIL_RESULT_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class GetDetailResultCheckUpNurseController {
    constructor(
        private readonly GetDetailResultCheckUpNurseService: GetDetailResultCheckUpNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_DETAIL_RESULT_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc khám sức khỏe định kỳ",
        example: 1,
        type: Number
    })
    @ApiParam({
        name: "studentID",
        description: "ID của học sinh muốn lấy kết quả",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.checkUp.detailResult)
    async getDetailResult(@Param('id') id: string, @Param('studentID') studentID: string, @GetUser() user) {
        return await this.GetDetailResultCheckUpNurseService.getDetailCheckupResult(+id, +studentID)
    }
}

