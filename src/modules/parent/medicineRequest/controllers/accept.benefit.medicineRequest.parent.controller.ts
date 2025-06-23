import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { CreateMedicineRequestParentService } from "../services/create.medicineRequest.parent.service";
import { CreateMedicineRequestDto } from "../dtos/create.medicineRequest.parent.dto";
import { StopMedicineRequestParentService } from "../services/stop.medicineRequest.parent.service";
import { AcceptedMedicineRequestParentService } from "../services/accept.benefit.medicineRequest.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.ACCEPT_BENEFIT_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionParent)

export class AcceptBenefitMedicineRequestParentController {
    constructor(
        private readonly acceptedMedicineRequestParentService: AcceptedMedicineRequestParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.ACCEPT_BENEFIT_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID đơn gửi thuốc dừng uống",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Put(routesV1.parent.medicineRequest.accepted)
    async acceptBenefit(@Param('id') id: string, @GetUser() user) {
        return await this.acceptedMedicineRequestParentService.accepted(+id, user)
    }
}
