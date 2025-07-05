import { Body, Controller, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { MedicalEventDashBoardAdminService } from "../services/medicalEvent.dashboard.admin.service";
import { GetDashboardMedicalEventQuery } from "../dtos/medicalEvent.dashboard.admin.query";
import { HealthProfileDashBoardAdminService } from "../services/healthProfille.dashboard.admin.service";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.HEALTH_PROFILE_DASHBOARD.parent}`)
@Controller(routesV1.versionAdmin)
export class HealthProfileDashboardAdminController {
    constructor(
        private readonly healthProfileDashBoardAdminService: HealthProfileDashBoardAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.HEALTH_PROFILE_DASHBOARD.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Post(routesV1.admin.dashboard.healthProfile)
    async healthProfileDashboard() {
        return await this.healthProfileDashBoardAdminService.healthProfileDashboard()
    }

}