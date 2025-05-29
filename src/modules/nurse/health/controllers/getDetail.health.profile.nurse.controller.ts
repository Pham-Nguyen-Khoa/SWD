import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailHealthProfileNurseService } from "../services/getDetail.health.profile.nurse.service";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_DETAIL_HEALTH_PROFILE.parent}`)
@Controller(routesV1.versionNurse)


export class GetDetailHealthProfileNurseController {
    constructor(
        private readonly getDetailHealthProfileNurseService: GetDetailHealthProfileNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_DETAIL_HEALTH_PROFILE.displayName })
    @ApiBearerAuth()
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(3)
    @ApiParam({
        name: "id",
        description: "ID của health profile",
        example: 1,
        type: Number
    })
    @Get(routesV1.nurse.health.getOne)
    async getDetail(@Param('id') id: string) {
        return await this.getDetailHealthProfileNurseService.getDetail(+id)
    }
}

