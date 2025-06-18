import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { CreateMedicineRequestParentService } from "../services/create.medicineRequest.parent.service";
import { CreateMedicineRequestDto } from "../dtos/create.medicineRequest.parent.dto";




@ApiTags(`${resourcesV1.Parent.root} - ${resourcesV1.Parent.CREATE_MEDICINE_REQUEST.parent}`)
@Controller(routesV1.versionParent)

export class CreateMedicineRequestParentController {
    constructor(
        private readonly createMedicineRequestParentService: CreateMedicineRequestParentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Parent.CREATE_MEDICINE_REQUEST.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Post(routesV1.parent.medicineRequest.root)
    async create(@Body() data: CreateMedicineRequestDto, @GetUser() user) {
        return await this.createMedicineRequestParentService.create(data, user)
    }
}
