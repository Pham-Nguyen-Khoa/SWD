import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateStudentAdminService } from "../services/create-student.admin.service";
import { CreateStudentDto } from "../dto/create-student.admin.dto";




@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.CREATE_STUDENT.parent}`)
@Controller(routesV1.versionAdmin)


export class CreateStudentAdminController {
    constructor(
        private readonly createStudentAdminService: CreateStudentAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.CREATE_STUDENT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Post(routesV1.admin.user.createStudent)
    async createStudent(@Body() data: CreateStudentDto, @GetUser() user) {
        return await this.createStudentAdminService.create(data, user)
    }

}