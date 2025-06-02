import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllVaccinationEventParentService } from "../services/getAllVaccinationEvent.parent.service";
import { AcceptedVaccinationEventParentService } from "../services/acceptVaccinationEvent.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.ACCEPTED_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionParent)


export class AcceptedVaccinationEventParentController {
    constructor(
        private readonly acceptedVaccinationEventParentService: AcceptedVaccinationEventParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.ACCEPTED_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc tiêm chủng",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.parent.vaccinationEvent.accepted)
    async accepted(@Param('id') id: string, @GetUser() user) {
        return await this.acceptedVaccinationEventParentService.accepted(+id, user)
    }
}

