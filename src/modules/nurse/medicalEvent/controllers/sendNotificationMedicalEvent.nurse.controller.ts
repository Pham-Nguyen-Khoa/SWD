import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetDetailMedicalEventNurseService } from "../services/getDetail.medicalEvent.nurse.service";
import { SendNotificationMedicalEventNurseService } from "../services/sendNotificationMedicalEvent.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.SEND_NOTIFICATION_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionNurse)


export class SendNotificationMedicalEventNurseController {
    constructor(
        private readonly sendNotificationMedicalEventNurseService: SendNotificationMedicalEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.SEND_NOTIFICATION_MEDICAL_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Sự kiện y tế muốn gửi thông báo ",
        example: 1,
        type: Number
    })
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(3)
    @Post(routesV1.nurse.medicalEvent.sendMedicalEvent)
    async send(@Param('id') id: string) {
        return await this.sendNotificationMedicalEventNurseService.send(+id)
    }
}

