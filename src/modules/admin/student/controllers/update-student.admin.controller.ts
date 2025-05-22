import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { RoleID } from "../../user/dto/create.user.admin.dto";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateStudentDto } from "../dto/update-student.admin.dto";
import { UpdateStudentAdminService } from "../services/update-student.admin.service";


@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.UPDATE_STUDENT.parent}`)
@Controller(routesV1.versionAdmin)

export class UpdateStudentAdminController {
    constructor(
        private readonly updateStudentService: UpdateStudentAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.UPDATE_STUDENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Patch(routesV1.admin.user.updateStudent)
    async updateStudent(@Param('idStudent') id: number, @Body() data: UpdateStudentDto, @GetUser() user) {
        return await this.updateStudentService.updateStudent(+id, data, user)
    }
}