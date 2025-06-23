import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { GetDetailMedicineRequestParentService } from "../services/getDetail.medicineRequest.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.GET_DETAIL_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionParent)

export class GetDetailMedicineRequestParentController {
    constructor(
        private readonly getDetailMedicineRequestParentService: GetDetailMedicineRequestParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.GET_DETAIL_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID đơn gửi thuốc muốn xem chi tiết",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.parent.medicineRequest.getOne)
    async getDetail(@Param('id') id: string, @Query() query, @GetUser() user) {
        return await this.getDetailMedicineRequestParentService.getDetail(+id, query, user)
    }
}
