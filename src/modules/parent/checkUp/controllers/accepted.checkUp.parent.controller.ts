import { Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { AcceptedCheckUpParentService } from "../services/accepted.checkUp.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.ACCEPTED_CHECK_UP.parent}`)
@Controller(routesV1.versionParent)


export class AcceptedVaccinationEventParentController {
    constructor(
        private readonly acceptedCheckUpParentService: AcceptedCheckUpParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.ACCEPTED_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc khám sức khỏe định kỳ",
        example: 1,
        type: Number
    })
    @ApiParam({
        name: "studentID",
        description: "ID của học sinh",
        example: 1,
        type: Number
    })

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Put(routesV1.parent.checkUp.accepted)
    async accepted(@Param('id') id: string, @Param('studentID') studentID: string, @GetUser() user) {
        return await this.acceptedCheckUpParentService.accepted(+id, +studentID, user)
    }

}

