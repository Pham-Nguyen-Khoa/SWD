import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { DeclinedCheckUpParentDto } from "../dtos/declined.checkUp.parent.dto";
import { DeclinedCheckUpParentService } from "../services/declined.checkUp.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.DECLIEND_CHECK_UP.parent}`)
@Controller(routesV1.versionParent)


export class DeclinedCheckUpParentController {
    constructor(
        private readonly declinedCheckUpParentService: DeclinedCheckUpParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.DECLIEND_CHECK_UP.displayName })
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
    @Put(routesV1.parent.checkUp.declined)
    async declined(@Param('id') id: string, @Param('studentID') studentID: string, @Body() note: DeclinedCheckUpParentDto, @GetUser() user) {
        return await this.declinedCheckUpParentService.declined(+id, note, +studentID, user)
    }
}

