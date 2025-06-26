import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllVaccinationEventNurseService } from "../services/getAllCheckUp.nurse.service";
import { StudentResultStatusCheckUpNurseService } from "../services/students-result-status.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.STUDENT_RESULT_STATUS_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class StudentResultStatusCheckUpNurseController {
    constructor(
        private readonly studentResultStatusCheckUpNurseService: StudentResultStatusCheckUpNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.STUDENT_RESULT_STATUS_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của khám sức khỏe định kỳ",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.checkUp.studentResultStatus)
    async studentsResultStatus(@Param('id') id: string, @GetUser() user) {
        return await this.studentResultStatusCheckUpNurseService.execute(+id)
    }
}

