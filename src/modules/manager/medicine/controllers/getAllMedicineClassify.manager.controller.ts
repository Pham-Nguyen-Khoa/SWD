import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllMedicineClassifyManagerService } from "../services/getAllMedicineClassify.manager.service";
import { GetAllMedicineClassifyrQuery } from "../dtos/getAll.medicineClassify.query";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_ALL_MEDICINE_CLASSIFY.parent}`)
@Controller(routesV1.versionManager)

export class GetAllMedicineClassifyManagerController {
    constructor(
        private readonly getAllMedicineClassifyManagerService: GetAllMedicineClassifyManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_ALL_MEDICINE_CLASSIFY.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.medicine.medicineClassify)
    async getAll(@Query() query: GetAllMedicineClassifyrQuery) {
        return await this.getAllMedicineClassifyManagerService.getAll(query)
    }
}

