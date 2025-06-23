import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllMedicineRequestNurseService } from "../services/getAll.medicineRequest.nurse.service";
import { GetAllMedicineRequestNurseQuery } from "../dtos/getAll.medicineRequest.nurse.query";
import { GetAllLowStockNurseService } from "../services/low-stock.medicineRequest.nurse.service";
import { GetAllLowStockNurseQuery } from "../dtos/low-stock.medicineRequest.nurse.query";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_ALL_LOW_STOCK.parent}`)
@Controller(routesV1.versionNurse)

export class GetAllLowStockNurseController {
    constructor(
        private readonly getAllLowStockNurseService: GetAllLowStockNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_ALL_LOW_STOCK.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.medicineRequest.lowStock)
    async getAllLowStock(@Query() query: GetAllLowStockNurseQuery) {
        return await this.getAllLowStockNurseService.lowStock(query)
    }
}

