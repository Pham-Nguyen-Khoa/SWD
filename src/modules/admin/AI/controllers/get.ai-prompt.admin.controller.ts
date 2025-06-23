import { Body, Controller, Get, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetAiPromptAdminService } from "../services/get.ai-prompt.admin.service";

@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.GET_AI_PROMPT.parent}`)
@Controller(routesV1.versionAdmin)

export class GetAIPromptAdminController {
    constructor(
        private readonly getAiPromptAdminService: GetAiPromptAdminService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.GET_AI_PROMPT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Get(routesV1.admin.ai.root)
    async get() {
        return await this.getAiPromptAdminService.get()
    }
}