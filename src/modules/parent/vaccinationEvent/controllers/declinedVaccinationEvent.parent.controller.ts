import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { DeclinedVaccinationEventParentService } from "../services/declinedVaccinationEvent.parent.service";
import { DeclinedVaccinationEventParentDto } from "../dtos/declinedVaccinationEvent.parent.dto";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.DECLIEND_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionParent)


export class DeclinedVaccinationEventParentController {
    constructor(
        private readonly declinedVaccinationEventParentService: DeclinedVaccinationEventParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.DECLIEND_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc tiêm chủng",
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
    @Put(routesV1.parent.vaccinationEvent.declined)
    async declined(@Param('id') id: string, @Param('studentID') studentID: string, @Body() note: DeclinedVaccinationEventParentDto, @GetUser() user) {
        return await this.declinedVaccinationEventParentService.declined(+id, note, +studentID, user)
    }
}

