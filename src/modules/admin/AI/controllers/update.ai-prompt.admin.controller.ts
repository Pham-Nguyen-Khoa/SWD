import { Body, Controller, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateAiPromptAdminService } from "../services/update.ai-prompt.admin.service";
import { UpdateAiPromptDto } from "../dtos/update.ai-prompt.admin.dto";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.UPDATE_AI_PROMPT.parent}`)
@Controller(routesV1.versionAdmin)

export class UpdateAIPromptAdminController {
    constructor(
        private readonly updateAiPromptAdminService: UpdateAiPromptAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.UPDATE_AI_PROMPT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Put(routesV1.admin.ai.root)
    async update(@Body() data: UpdateAiPromptDto, @GetUser() user) {
        return await this.updateAiPromptAdminService.update(data, user)
    }
}