import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllVaccinationEventNurseService } from "../services/getAllCheckUp.nurse.service";
import { CheckMeetingNurseService } from "../services/checkMeeting.nurse.service";

@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.CHECK_MEETING_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class CheckMeetingCheckUpNurseController {
    constructor(
        private readonly checkMeetingNurseService: CheckMeetingNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.CHECK_MEETING_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiQuery({
        name: 'datetime',
        required: true,
        description: 'Thời gian muốn kiểm tra, định dạng ISO (VD: 2025-06-30T14:00:00)',
        example: '2025-06-30T14:00:00',
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.checkUp.checkMeeting)
    async check(@Query('datetime') datetime: string) {
        return await this.checkMeetingNurseService.checkSchedule(datetime)
    }
}

