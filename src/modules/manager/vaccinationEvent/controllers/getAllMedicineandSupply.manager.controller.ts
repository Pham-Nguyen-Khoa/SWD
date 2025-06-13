import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllVaccinationEventManagerService } from "../services/getAllVaccinationEvent.manager.service";
import { GetAllMedicineAndSupplyManagerService } from "../services/getAllMedicineandSupply.manager.service";





@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_ALL_MEDICINE_AND_SUPPLY.parent}`)
@Controller(routesV1.versionManager)


export class GetAllMedicineAndSupplyNurseController {
    constructor(
        private readonly getAllMedicineAndSupplyManagerService: GetAllMedicineAndSupplyManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_ALL_MEDICINE_AND_SUPPLY.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.vaccinationEvent.medicines)
    async getAll() {
        return await this.getAllMedicineAndSupplyManagerService.getAll()
    }
}

