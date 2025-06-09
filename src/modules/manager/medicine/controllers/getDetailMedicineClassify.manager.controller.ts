import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMedicineManagerService } from "../services/create.medicine.manager.service";
import { CreateMedicineDTO } from "../dtos/create.medicine.manager.dto";
import { GetAllMedicineClassifyManagerService } from "../services/getAllMedicineClassify.manager.service";
import { GetDetailMedicineClassifyManagerService } from "../services/getDetailMedicineClassify.manager.service";
import { GetDetailMedicineClassifyrQuery } from "../dtos/getDetail.medicineClassify.query";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_DETAIL_MEDICINE_CLASSIFY.parent}`)
@Controller(routesV1.versionManager)

export class GetDetailMedicineClassifyManagerController {
    constructor(
        private readonly getDetailMedicineClassifyManagerService: GetDetailMedicineClassifyManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_DETAIL_MEDICINE_CLASSIFY.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của danh mục thuốc",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.medicine.detailMedicineClassify)
    async getDetail(@Param('id') id: string, @Query() query: GetDetailMedicineClassifyrQuery) {
        return await this.getDetailMedicineClassifyManagerService.getDetail(+id,query)
    }

}

