import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllHealthProfileNurseService } from "../services/getAll.health.profile.nurse.service";
import { GetAllHealthProfileQuery } from "../dto/getAll.health.profile.query.dto";




@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_ALL_HEALTH_PROFILE.parent}`)
@Controller(routesV1.versionNurse)


export class GetAllHealthProfileNurseController {
    constructor(
        private readonly getAllHealthProfileNurseService: GetAllHealthProfileNurseService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_ALL_HEALTH_PROFILE.displayName })
    @ApiBearerAuth()
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(3)
    @Get(routesV1.nurse.health.root)
    async getAll(@Query() query: GetAllHealthProfileQuery, @GetUser() user) {
        return await this.getAllHealthProfileNurseService.getAll(query);
    }
}

