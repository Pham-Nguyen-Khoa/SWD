import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { GetAllMeetingParentService } from "../services/getAllMeeting.parent.service";


@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.GET_ALL_MEETING.parent}`)
@Controller(routesV1.versionParent)
export class GetAllMeetingParentController {
    constructor(
        private readonly getAllMeetingParentService: GetAllMeetingParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.GET_ALL_MEETING.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.parent.checkUp.meeting)
    async getAll(@GetUser() user) {
        return await this.getAllMeetingParentService.getAll(user)
    }
}
