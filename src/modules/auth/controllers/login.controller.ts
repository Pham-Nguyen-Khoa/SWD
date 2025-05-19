import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "../services/login.service";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dto/login.dto";


@ApiTags(
    `${resourcesV1.LOGIN.parent}`,
)
@Controller(routesV1.versionClient)
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) { }

    @ApiOperation({ summary: resourcesV1.LOGIN.displayName })
    @Post(routesV1.auth.login)
    async login(@Body() data: LoginDto) {
        return this.loginService.login(data)
    }
}