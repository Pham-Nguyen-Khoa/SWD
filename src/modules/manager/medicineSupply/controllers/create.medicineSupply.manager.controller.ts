import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMedicineSupplyDTO } from "../dtos/create.medicineSupply.manager.dto";
import { CreateMedicineSupplyManagerService } from "../services/create.medicineSupply.manager.service";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.CREATE_MEDICINE_SUPPLY.parent}`)
@Controller(routesV1.versionManager)

export class CreateMedicineSupplyManagerController {
    constructor(
        private readonly createMedicineSupplyManagerService: CreateMedicineSupplyManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.CREATE_MEDICINE_SUPPLY.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Post(routesV1.manager.medicineSupply.root)
    @UseInterceptors(FileInterceptor('image'))
    async create(@UploadedFile() image: Express.Multer.File,
        @Body() body: CreateMedicineSupplyDTO,
        @GetUser() user) {
        return await this.createMedicineSupplyManagerService.create({
            ...body,
            image
        }, user)
    }
}

