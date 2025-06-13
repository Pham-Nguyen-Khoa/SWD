import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllMedicineSupplyQuery } from "../dtos/getAll.medicineSuplly.manager.query";
import { GetAllMedicineSupplyManagerService } from "../services/getAll.medicineSupply.manager.service";
import { DeleteMedicineSupplyManagerService } from "../services/delete.medicineSupply.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.DELETE_MEDICINE_SUPPLY.parent}`)
@Controller(routesV1.versionManager)

export class DeleteMedicineSupplyManagerController {
    constructor(
        private readonly deleteMedicineSupplyManagerService: DeleteMedicineSupplyManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.DELETE_MEDICINE_SUPPLY.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của medicine Supply muốn xóa",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Delete(routesV1.manager.medicineSupply.getOne)
    async delete(@Param('id') id: string) {
        return await this.deleteMedicineSupplyManagerService.delete(+id)
    }
}

