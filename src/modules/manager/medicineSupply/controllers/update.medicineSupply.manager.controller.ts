import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMedicineSupplyDTO } from "../dtos/create.medicineSupply.manager.dto";
import { CreateMedicineSupplyManagerService } from "../services/create.medicineSupply.manager.service";
import { UpdateMedicineSupplyDTO } from "../dtos/update.medicineSupply.manager.dto";
import { UpdateMedicineSupplyManagerService } from "../services/update.medicineSupply.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.UPDATE_MEDICINE_SUPPLY.parent}`)
@Controller(routesV1.versionManager)

export class UpdateMedicineSupplyManagerController {
    constructor(
        private readonly updateMedicineSupplyManagerService: UpdateMedicineSupplyManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.UPDATE_MEDICINE_SUPPLY.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của medicine Supply muốn update",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Patch(routesV1.manager.medicineSupply.getOne)
    @UseInterceptors(FileInterceptor('image'))
    async update(@UploadedFile() image: Express.Multer.File,
        @Param('id') id: string,
        @Body() body: UpdateMedicineSupplyDTO,
        @GetUser() user) {
        return await this.updateMedicineSupplyManagerService.update({
            ...body,
            image
        }, user, +id)

    }
}

