import { Controller, Delete, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { DeleteIsMeetingNurseService } from "../services/deleteIsMeeting.nurse.service";

@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.DELETE_IS_MEETING_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)
export class DeleteIsMeetingNurseController {
    constructor(
        private readonly deleteIsMeetingNurseService: DeleteIsMeetingNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.DELETE_IS_MEETING_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID Meeting ",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Delete(routesV1.nurse.checkUp.deleteIsMeeting)
    async deleteIsMeeting(@Param('id') id: string, @GetUser() user) {
        return await this.deleteIsMeetingNurseService.delete(+id, user)
    }
}

