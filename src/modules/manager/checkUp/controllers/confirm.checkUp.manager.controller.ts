import { Body, Controller, Param, Patch, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { SendMailCheckUpDTO } from "../dtos/sendMail.vaccinationEvent.manager.dto";
import { ConfirmCheckUpManagerService } from "../services/confirm.checkUp.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.CONFIRM_CHECK_UP.parent}`)
@Controller(routesV1.versionManager)

export class ConfirmCheckUpManagerController {
    constructor(
        private readonly confirmCheckUpManagerService: ConfirmCheckUpManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.CONFIRM_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của khám sức khỏe định kỳ muốn confirm và gửi đi cho phụ huynh học sinh",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Put(routesV1.manager.checkUp.getOne)
    async confirm(@Param('id') id: string, @Body() data: SendMailCheckUpDTO) {
        return await this.confirmCheckUpManagerService.confirm(+id, data)
    }
}

