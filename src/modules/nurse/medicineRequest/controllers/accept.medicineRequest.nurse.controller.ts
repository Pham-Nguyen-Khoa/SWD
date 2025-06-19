import { Controller, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailMedicineRequestNurseService } from "../services/getDetail.medicineRequest.nurse.service";
import { AcceptedMedicineRequestNurseService } from "../services/accept.medicineRequest.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.ACCEPT_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionNurse)

export class AcceptMedicineRequestNurseController {
    constructor(
        private readonly acceptedMedicineRequestNurseService: AcceptedMedicineRequestNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.ACCEPT_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của đơn gửi thuốc muốn đồng ý",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Put(routesV1.nurse.medicineRequest.accepted)
    async acceptMedicineRequest(@Param('id') id: string, @GetUser() user) {
        return await this.acceptedMedicineRequestNurseService.accept(+id, user)
    }
}

