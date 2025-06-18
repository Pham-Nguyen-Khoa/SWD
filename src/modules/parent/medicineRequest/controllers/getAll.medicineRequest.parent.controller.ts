import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { GetAllMedicineRequestParentService } from "../services/getAll.medicineRequest.paremt.service";
import { GetAllMedicineRequestParentQuery } from "../dtos/getAll.medicineRequest.nurse.dto";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.GET_ALL_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionParent)

export class GetAllMedicineRequestParentController {
    constructor(
        private readonly getAllMedicineRequestParentService: GetAllMedicineRequestParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.GET_ALL_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.parent.medicineRequest.root)
    async getAll(@Query() query: GetAllMedicineRequestParentQuery, @GetUser() user) {
        return await this.getAllMedicineRequestParentService.getAll(query, user)
    }
}
