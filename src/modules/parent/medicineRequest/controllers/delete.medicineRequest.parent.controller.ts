import { Controller, Delete, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { GetAllMedicineRequestParentService } from "../services/getAll.medicineRequest.paremt.service";
import { GetAllMedicineRequestParentQuery } from "../dtos/getAll.medicineRequest.nurse.dto";
import { DeleteMedicineRequestParentService } from "../services/delete.medicineRequest.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.DELETE_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionParent)

export class DeleteMedicineRequestParentController {
    constructor(
        private readonly deleteMedicineRequestParentService: DeleteMedicineRequestParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.DELETE_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của đơn thuốc gửi muốn xóa",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Delete(routesV1.parent.medicineRequest.getOne)
    async delete(@Param('id') id: string) {
        return await this.deleteMedicineRequestParentService.delete(+id)
    }
}
