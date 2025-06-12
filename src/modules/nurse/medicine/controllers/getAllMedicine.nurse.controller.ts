import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllMedicineNurseService } from "../services/getAllMedicine.nurse.service";
import { GetAllMedicinerQuery } from "../dtos/getAllMedicine.nurse.query";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_ALL_MEDICINE.parent}`)
@Controller(routesV1.versionNurse)


export class GetAllMedicineNurseController {
    constructor(
        private readonly getAllMedicineNurseService: GetAllMedicineNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_ALL_MEDICINE.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.medicine.root)
    async getAllMedicine(@Query() query: GetAllMedicinerQuery) {
        return await this.getAllMedicineNurseService.getAll(query)
    }
}

