import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetAllStudentAdminService } from "../services/getAll-student.admin.service";
import { GetAllStudentQuery } from "../dto/get.all.student.query.dto";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.GET_ALL_STUDENT.parent}`)
@Controller(routesV1.versionAdmin)

export class GetAllStudentAdminController {
    constructor(
        private readonly getAllStudentService: GetAllStudentAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.GET_ALL_STUDENT.displayName })
    @ApiBearerAuth()
    // @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)

    @Get(routesV1.admin.user.createStudent)
    async getAllStudentAdminController(@Query() query: GetAllStudentQuery) {
        return await this.getAllStudentService.getAll(query)
    }
}