import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { HealthCheckupMeetingRequestDto } from "../dtos/createMeetingCheckUp.nurse.dto";
import { CreateIsMeetingNurseService } from "../services/createMeeting.nurse.service";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.CREAT_IS_MEETING_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class CreateMeetingNurseController {
    constructor(
        private readonly createIsMeetingNurseService: CreateIsMeetingNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.CREAT_IS_MEETING_CHECK_UP.displayName })
    @ApiBearerAuth()


    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.checkUp.isMeeting)
    async createMeeting(@Body() data: HealthCheckupMeetingRequestDto, @GetUser() user) {
        return await this.createIsMeetingNurseService.create(data, user)
    }
}

