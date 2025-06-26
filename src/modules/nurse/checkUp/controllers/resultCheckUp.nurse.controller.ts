import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { CheckUpResultDto } from "../dtos/result.checkUp.nurse.dto";
import { ResultCheckUpNurseService } from "../services/resultCheckUp.nurse.controller";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.RESULT_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class ResultCheckUpNurseController {
    constructor(
        private readonly resultCheckUpNurseService: ResultCheckUpNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.RESULT_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc khám sức khỏe định kỳ muốn ghi nhận kết quả",
        example: 1,
        type: Number
    })

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.checkUp.result)
    async result(@Param('id') id: string, @Body() data: CheckUpResultDto, @GetUser() user) {
        return await this.resultCheckUpNurseService.recordCheckupResults(+id, data, user)
    }
}

