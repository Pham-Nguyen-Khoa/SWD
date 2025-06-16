import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { CreateMedicalEventNurseDTO } from "../dtos/create.medicalEvent.nurse.dto";
import { CreateMedicalEventNurseService } from "../services/create.medicalEvent.nurse.service";
import { UpdateStatusMedicalEventNurseService } from "../services/update.status.medicalEvent.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.UPDATE_STATUS_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionNurse)


export class UpdateStatusMedicalEventNurseController {
    constructor(
        private readonly updateStatusMedicalEventNurseService: UpdateStatusMedicalEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.UPDATE_STATUS_MEDICAL_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Sự kiện y tế muốn cập nhật trạng thái",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Patch(routesV1.nurse.medicalEvent.updateStatus)
    async update(@Param('id') id: string) {
        return await this.updateStatusMedicalEventNurseService.updateStatus(+id)
    }
}

