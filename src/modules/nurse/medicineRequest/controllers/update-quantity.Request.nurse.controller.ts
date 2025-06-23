import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateQuantityMedicineDto } from "../dtos/update-quantity.nurse.dto";
import { UpdateQuantityMedicineNurseService } from "../services/update-quantity.Request.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.UPDATE_QUANTITY_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionNurse)

export class UpdateQuantityMedicineNurseController {
    constructor(
        private readonly updateQuantityMedicineNurseService: UpdateQuantityMedicineNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.UPDATE_QUANTITY_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của thuốc muốn cập nhật",
        example: 1,
        type: Number
    })
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(3)
    @Patch(routesV1.nurse.medicineRequest.updateQuantity)
    async updateQuantity(@Param('id') id: string, @Body() data: UpdateQuantityMedicineDto) {
        return await this.updateQuantityMedicineNurseService.update(+id, data)
    }
}

