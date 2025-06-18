import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UpdateMedicalEventNurseService } from "../services/update.medicalEvent.nurse.service";
import { UpdateMedicalEventNurseDTO } from "../dtos/update.medicalEvent.nurse.dto";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.UPDATE_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionNurse)
export class UpdateMedicalEventNurseController {
    constructor(
        private readonly updateMedicalEventNurseService: UpdateMedicalEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.UPDATE_MEDICAL_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Sự kiện y tế muốn cập nhật",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Patch(routesV1.nurse.medicalEvent.getOne)
    async update(@Param('id') id: string, @Body() data: UpdateMedicalEventNurseDTO,@GetUser() user) {
        return await this.updateMedicalEventNurseService.update(+id,data,user)
    }
}

