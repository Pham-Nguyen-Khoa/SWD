import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { DeclineMeetingParentService } from "../services/declinedMeeting.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.DECLINE_MEETING.parent}`)
@Controller(routesV1.versionParent)

export class DeclineMeetingParentController {
    constructor(
        private readonly declineMeetingParentService: DeclineMeetingParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.DECLINE_MEETING.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID thông báo",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Put(routesV1.parent.checkUp.declinedMeeting)
    async declineMeeting(@Param('id') id: string, @GetUser() user) {
        return await this.declineMeetingParentService.declined(+id, user)
    }
}
