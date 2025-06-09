import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { DeleteMedicineClassifyManagerService } from "../services/delete.medicineClassify.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.DELETE_MEDICINE_CLASSIFY.parent}`)
@Controller(routesV1.versionManager)

export class DeleteMedicineClassifyManagerController {
    constructor(
        private readonly deleteMedicineClassifyManagerService: DeleteMedicineClassifyManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.DELETE_MEDICINE_CLASSIFY.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của danh mục thuốc muốn xóa",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Delete(routesV1.manager.medicine.detailMedicineClassify)
    async delete(@Param('id') id: string) {
        return await this.deleteMedicineClassifyManagerService.delete(+id)
    }

}

