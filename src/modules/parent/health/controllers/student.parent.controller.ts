import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { StudentParentService } from "../services/student.parent.service";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.STUDENT_OF_PARENT.parent}`)
@Controller(routesV1.versionParent)


export class StudentParentController {
    constructor(
        private readonly studentParentService: StudentParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.STUDENT_OF_PARENT.displayName })
    @ApiBearerAuth()

    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.parent.health.student)
    async student(@GetUser() user) {
        return await this.studentParentService.student(user)
    }
}
