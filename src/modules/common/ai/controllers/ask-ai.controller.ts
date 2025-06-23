import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { AskAIService } from "../services/ask-ai.service";
import { AskAIDTO } from "../dtos/ask-ai.dto";




@ApiTags(`Common - ${resourcesV1.ASK_AI.parent}`)
@Controller(routesV1.versionClient)


export class AskAIController {
    constructor(
        private readonly askAIService: AskAIService
    ) { }
    @ApiOperation({ summary: resourcesV1.ASK_AI.displayName })
    // @ApiBearerAuth()
    // @UseGuards(JWTGuard, RolesGuard)
    // @Roles(1, 2)
    @Post(routesV1.common.ai.root)
    async ask(@Body() data: AskAIDTO) {
        return await this.askAIService.ask(data)
    }
}
