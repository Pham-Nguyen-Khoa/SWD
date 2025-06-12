import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetAllMedicineClassifyNurseService } from "../services/getAllMedicineClassify.nurse.service";
import { GetAllMedicineSupplyNurseService } from "../services/getAllMedicineSupply.nurse.service";
import { GetAllRequestManagerNurseService } from "../services/getAllRequestManager.nurse.service";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";

@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_ALL_SEND_REQUEST_MANAGER.parent}`)
@Controller(routesV1.versionNurse)

export class GetAllSendRequestManagerNurseController {
    constructor(
        private readonly getAllRequestManagerNurseService: GetAllRequestManagerNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_ALL_SEND_REQUEST_MANAGER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2, 3)
    @Get(routesV1.nurse.medicine.sendRequest)
    async getAllSendRequest(@GetUser() user) {
        return await this.getAllRequestManagerNurseService.getAllRequest(user)
    }
}

