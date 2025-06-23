import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailMedicineRequestNurseService } from "../services/getDetail.medicineRequest.nurse.service";
import { AcceptedMedicineRequestNurseService } from "../services/accept.medicineRequest.nurse.service";
import { CreateMedicineLogDto } from "../dtos/create.medicineLog.nurse.dto";
import { CreateMedicineLogNurseService } from "../services/create.medicineLog.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.CREATE_MEDICINE_LOG.parent}`)
@Controller(routesV1.versionNurse)

export class CreateMedicineLogNurseController {
    constructor(
        private readonly createMedicineLogNurseService: CreateMedicineLogNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.CREATE_MEDICINE_LOG.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của đơn gửi thuốc muốn đồng ý",
        example: 1,
        type: Number
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Post(routesV1.nurse.medicineRequest.getOne)
    async createLog(@Param('id') id: string, @GetUser() user, @Body() data: CreateMedicineLogDto,) {
        return await this.createMedicineLogNurseService.createLog(+id, user, data)
    }
}

