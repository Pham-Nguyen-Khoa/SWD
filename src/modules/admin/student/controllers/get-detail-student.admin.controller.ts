import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetDetailStudentAdminService } from "../services/get-detail-student.admin.service";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.GET_DETAIL_STUDENT.parent}`)
@Controller(routesV1.versionAdmin)
export class GetDetailStudentAdminController {
    constructor(
        private readonly getDetailStudentService: GetDetailStudentAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.GET_DETAIL_STUDENT.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "idStudent",
        description: "ID của Student",
        example: 1,
        type: Number
    })

    // @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Get(routesV1.admin.user.updateStudent)
    async getDetailStudentAdminController(@Param('idStudent') id: string) {
        return await this.getDetailStudentService.getDetail(+id)
    }
}