import { Body, Controller, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateMedicineDTO } from "../dtos/update.medicine.manager.dto";
import { UpdateMedicineManagerService } from "../services/update.medicine.manager.service";



@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.UPDATE_MEDICINE.parent}`)
@Controller(routesV1.versionManager)

export class UpdateMedicineManagerController {
    constructor(
        private readonly updateMedicineManagerService: UpdateMedicineManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.UPDATE_MEDICINE.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của medicine",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Patch(routesV1.manager.medicine.getOne)
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @UploadedFile() image: Express.Multer.File,
        @Param('id') id: string,
        @Body() body: UpdateMedicineDTO,
        @GetUser() user) {
        return await this.updateMedicineManagerService.update({
            ...body,
            image
        }, user, +id)
    }
}

