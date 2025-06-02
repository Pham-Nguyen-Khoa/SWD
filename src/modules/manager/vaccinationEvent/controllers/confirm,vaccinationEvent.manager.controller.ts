import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ConfrimVaccinationEventManagerService } from "../services/confirm.vaccinationEvent.manager.service";
import { SendMailVaccinationEventDTO } from "../dtos/sendMail.vaccinationEvent.manager.dto";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.CONFIRM_VACCINATION_EVENT.parent}`)
@Controller(routesV1.versionManager)

export class ConfirmVaccinationEventManagerController {
    constructor(
        private readonly confrimVaccinationEventManagerService: ConfrimVaccinationEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.CONFIRM_VACCINATION_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Tiêm chủng muốn confirm và gửi đi cho phụ huynh học sinh",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Patch(routesV1.manager.vaccinationEvent.getOne)
    async confirm(@Param('id') id: string, @Body() data: SendMailVaccinationEventDTO) {
        return await this.confrimVaccinationEventManagerService.confirm(+id, data)
    }
}

