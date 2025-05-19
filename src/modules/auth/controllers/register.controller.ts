import { Body, Controller, Post } from "@nestjs/common";
import { RegisterService } from "../services/register.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { RegisterDto } from "../dto/register.dto";

@ApiTags(
    `${resourcesV1.REGISTER.parent}`,
)
@Controller(routesV1.versionClient)
export class RegisterController {
    constructor(
        private readonly registerService: RegisterService
    ) { }
    @ApiOperation({ summary: resourcesV1.REGISTER.displayName })
    @Post(routesV1.auth.register)
    async register(@Body() data: RegisterDto) {
        return await this.registerService.register(data);
    }
}