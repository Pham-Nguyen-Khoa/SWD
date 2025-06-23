import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { AskAIService } from "../services/ask-ai.service";
import { AskAIDTO } from "../dtos/ask-ai.dto";
import { GetAllChatService } from "../services/get-all-chat.service";
import { GetAllChatQuery } from "../dtos/get-all-chat.query";




@ApiTags(`Common - ${resourcesV1.GET_ALL_CHAT.parent}`)
@Controller(routesV1.versionClient)


export class GetAllChatController {
    constructor(
        private readonly getAllChatService: GetAllChatService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_ALL_CHAT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2, 3, 4, 5)
    @Get(routesV1.common.ai.root)
    async getAll(@Query() query: GetAllChatQuery, @GetUser() user) {
        return await this.getAllChatService.getAll(query, user)
    }
}
