import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllMedicineNurseService } from "../services/getAllMedicine.nurse.service";
import { GetAllMedicinerQuery } from "../dtos/getAllMedicine.nurse.query";
import { SendRequestNurseService } from "../services/sendRequestManager.nurse.service";
import { SendRequestManagerDTO } from "../dtos/sendRequestManager.nurse.dto";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.SEND_REQUEST_MANAGER.parent}`)
@Controller(routesV1.versionNurse)


export class SendRequestNurseController {
    constructor(
        private readonly sendRequestNurseService: SendRequestNurseService

    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.SEND_REQUEST_MANAGER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.medicine.sendRequest)
    async sendRequest(@Body() data: SendRequestManagerDTO, @GetUser() user) {
        return await this.sendRequestNurseService.send(data, user)
    }
}

