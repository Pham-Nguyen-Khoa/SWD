import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllMedicalEventManagerService } from "../services/getAll.medicalEvent.manager.service";
import { GetAllMedicalEventManagerQuery } from "../dtos/getAll.medicalEvent.manager.query";





@ApiTags(`${resourcesV1.Manager.root} - ${resourcesV1.Manager.GET_ALL_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionManager)


export class GetAllMedicalEventManagerController {
    constructor(
        private readonly getAllMedicalEventManagerService: GetAllMedicalEventManagerService
    ) { }
    @ApiOperation({ summary: resourcesV1.Manager.GET_ALL_MEDICAL_EVENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(2)
    @Get(routesV1.manager.medicalEvent.root)
    async getAll(@Query() query: GetAllMedicalEventManagerQuery) {
        return await this.getAllMedicalEventManagerService.getAllForManager(query)
    }
}

