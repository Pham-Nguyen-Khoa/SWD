import { resourcesV1 } from 'src/configs/app.permission';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { routesV1 } from 'src/configs/app.routes';
import { Roles } from 'src/modules/auth/guards/roles.decorator';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { DeleteUserAdminService } from '../services/delete.user.admin.service';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';


@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.DELETE_USER.parent}`)
@Controller(routesV1.versionAdmin)

export class DeleteUserAdminController {
    constructor(
        private readonly deleteUserService: DeleteUserAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.DELETE_USER.displayName })
    @ApiBearerAuth()
    // @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Delete(routesV1.admin.user.delete)
    async deleteUser(@Param('id') id: string) {
        return await this.deleteUserService.delete(+id)
    }
}           