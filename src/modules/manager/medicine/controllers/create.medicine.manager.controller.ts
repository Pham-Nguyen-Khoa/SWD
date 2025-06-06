import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMedicineManagerService } from "../services/create.medicine.manager.service";
import { CreateMedicineDTO } from "../dtos/create.medicine.manager.dto";




@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.CREATE_MEDICINE.parent}`)
@Controller(routesV1.versionManager)

export class CreateMedicineManagerController {
    constructor(
        private readonly createMedicineManagerService: CreateMedicineManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.CREATE_MEDICINE.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Post(routesV1.manager.medicine.root)
    @UseInterceptors(FileInterceptor('image'))
    async create(@UploadedFile() image: Express.Multer.File,
        @Body() body: CreateMedicineDTO,
        @GetUser() user) {
        return await this.createMedicineManagerService.create({
            ...body,
            image
        }, user)

    }
}

