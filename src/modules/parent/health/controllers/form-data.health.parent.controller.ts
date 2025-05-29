import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { resourcesV1 } from "src/configs/app.permission"
import { routesV1 } from "src/configs/app.routes"
import { FormDataHealthParentService } from "../services/formData.health.parent.service"
import { JWTGuard } from "src/modules/auth/guards/jwt.guard"
import { RolesGuard } from "src/modules/auth/guards/roles.guard"
import { Roles } from "src/modules/auth/guards/roles.decorator"

@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.FROM_DATA_HEALTH_PROFILE.parent}`)
@Controller(routesV1.versionParent)
export class FromDataHealthProfileParentController {
    constructor(
        private readonly formDataHealthParentService: FormDataHealthParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.FROM_DATA_HEALTH_PROFILE.displayName })
    @Get(routesV1.parent.health.formData)
    async formData() {
        console.log("hello")
        return await this.formDataHealthParentService.formData()
    }
}

