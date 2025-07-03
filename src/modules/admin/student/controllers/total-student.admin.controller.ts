import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetTotalStudentAdminService } from "../services/total-student.admin.service";
import { GetTotalStudentQuery } from "../dto/get-total-student.admin.query";


@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.GET_TOTAL_STUDENT.parent}`)
@Controller(routesV1.versionAdmin)

export class GetTotalStudentAdminController {
    constructor(
        private readonly getTotalStudentAdminService: GetTotalStudentAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.GET_TOTAL_STUDENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2, 3)
    @Get(routesV1.admin.user.totalStudent)
    async getTotalStudentAdminController(@Query() query: GetTotalStudentQuery) {
        return await this.getTotalStudentAdminService.getTotal(query)
    }
}