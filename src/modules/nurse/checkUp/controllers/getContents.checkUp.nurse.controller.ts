import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetCheckupContentsService } from "../services/getContents.checkUp.nurse.service";





@ApiTags(`${resourcesV1.Nurse.root} - ${resourcesV1.Nurse.GET_CONTENTS_CHECK_UP.parent}`)
@Controller(routesV1.versionNurse)

export class GetContentsCheckUpNurseController {
    constructor(
        private readonly getCheckupContentsService: GetCheckupContentsService
    ) { }
    @ApiOperation({ summary: resourcesV1.Nurse.GET_CONTENTS_CHECK_UP.displayName })
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        description: "ID của khám sức khỏe định kỳ",
        example: 1,
        type: Number
    })
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(3)
    @Get(routesV1.nurse.checkUp.contents)
    async getContents(@Param('id') id: string) {
        return await this.getCheckupContentsService.execute(+id)
    }
}

