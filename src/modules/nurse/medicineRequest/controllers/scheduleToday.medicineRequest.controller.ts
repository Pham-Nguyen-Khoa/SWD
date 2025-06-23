import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ScheduleTodayMedicineRequestNurseService } from "../services/scheduleToday.medicineRequest.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.SCHEDULE_TODAY_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionNurse)

export class ScheduleTodayMedicineRequestNurseController {
    constructor(
        private readonly scheduleTodayMedicineRequestNurseService: ScheduleTodayMedicineRequestNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.SCHEDULE_TODAY_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(3)
    @Get(routesV1.nurse.medicineRequest.schedule)
    async scheduleTodayMedicineRequest() {
        console.log("hello")
        return await this.scheduleTodayMedicineRequestNurseService.schedule()
    }
}

