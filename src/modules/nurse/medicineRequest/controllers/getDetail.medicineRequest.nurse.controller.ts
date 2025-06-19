import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailMedicineRequestNurseService } from "../services/getDetail.medicineRequest.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_DETAIl_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionNurse)

export class GetDetailMedicineRequestNurseController {
    constructor(
        private readonly getDetailMedicineRequestNurseService: GetDetailMedicineRequestNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_DETAIl_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của đơn gửi thuốc muốn xem chi tiết",
        example: 1,
        type: Number
    })
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(3)
    @Get(routesV1.nurse.medicineRequest.getOne)
    async getDetailMedicineRequest(@Param('id') id: string) {
        return await this.getDetailMedicineRequestNurseService.detail(+id)
    }
}

