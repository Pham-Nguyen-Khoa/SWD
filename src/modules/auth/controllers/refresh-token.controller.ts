import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { RefreshService } from "../services/refresh-token.service";
import { RefreshGuard } from "../guards/refresh.guard";


@ApiTags(resourcesV1.REFRESH_TOKEN.parent)
@Controller(routesV1.versionClient)

export class RefreshTokenController {
    constructor(
        private readonly refreshService: RefreshService
    ) { }

    @UseGuards(RefreshGuard)
    @Post(routesV1.auth.refreshToken)
    async refresh(@Request() req) {
        return this.refreshService.refresh(req.user)
    }
}