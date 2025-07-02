import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllStudentIsMeetingNurseService } from "../services/getAllStudentIsMeeting.nurse.service";

@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_STUDENT_IS_MEETING_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class GetAllStudentIsMeetingNurseController {
    constructor(
        private readonly getAllStudentIsMeetingNurseService: GetAllStudentIsMeetingNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_STUDENT_IS_MEETING_CHECK_UP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.checkUp.studentIsMeeting)
    async getAllStudentIsMeeting(@GetUser() user) {
        return await this.getAllStudentIsMeetingNurseService.getAll()
    }
}

