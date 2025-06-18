import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { CreateMedicalEventNurseDTO } from "../dtos/create.medicalEvent.nurse.dto";
import { CreateTreatmentNurseService } from "../services/createTreatment.nurse.service";
import { CreateTreatmentDTO } from "../dtos/create.treatment.nurse.dto";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.CREATE_MEDICAL_EVENT.parent}`)
@Controller(routesV1.versionNurse)


export class CreateTreatmentNurseController {
    constructor(
        private readonly createTreatmentNurseService: CreateTreatmentNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.CREATE_TREATMENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của Sự kiện y tế tạo hành động",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.medicalEvent.createTreatment)
    async create(@Param('id') id: string, @Body() data: CreateTreatmentDTO, @GetUser() user) {
        return await this.createTreatmentNurseService.create(+id,data,user)
    }
}

