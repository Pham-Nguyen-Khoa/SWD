import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { SendNotificationResultCheckUpNurseService } from "../services/sendNotificationResult.checkUp.nurse.service";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.SEND_NOTIFICATION_RESULT_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class SendNotificationResultCheckUpNurseController {
    constructor(
        private readonly sendNotificationResultCheckUpNurseService: SendNotificationResultCheckUpNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.SEND_NOTIFICATION_RESULT_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của cuộc khám sức khỏe định kỳ muốn gửi thông báo đến phụ huynh",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.checkUp.sendResult)
    async sendNotificationResult(@Param('id') id: string, @GetUser() user) {
        return await this.sendNotificationResultCheckUpNurseService.sendNotification(+id, user)
    }
}

