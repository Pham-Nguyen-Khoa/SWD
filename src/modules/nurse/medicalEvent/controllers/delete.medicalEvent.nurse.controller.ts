import { Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { DeleteMedicalEventNurseService } from "../services/delete.medicalEvent.nurse.service";

@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.DELETE_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionNurse)


export class DeleteMedicalEventNurseController {
    constructor(
        private readonly deleteMedicalEventNurseService: DeleteMedicalEventNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.DELETE_MEDICAL_EVENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Sự kiện y tế muốn xóa",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Delete(routesV1.nurse.medicalEvent.getOne)
    async delete(@Param('id') id: string) {
        return await this.deleteMedicalEventNurseService.delete(+id)
    }
}

