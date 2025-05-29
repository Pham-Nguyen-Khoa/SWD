import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { resourcesV1 } from "src/configs/app.permission";
import { routesV1 } from "src/configs/app.routes";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { ImportStudentService } from "../services/import-student.admin.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { GetUser } from "src/modules/auth/guards/get-user.decorator";


@ApiTags(`${resourcesV1.Admin.root} - ${resourcesV1.Admin.IMPORT_STUDENT.parent}`)
@Controller(routesV1.versionAdmin)

export class ImportStudentAdminController {
    constructor(
        private readonly importStudentService: ImportStudentService
    ) { }
    @ApiOperation({ summary: resourcesV1.Admin.CREATE_USER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Post(routesV1.admin.user.importStudent)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({ destination: './uploads', filename: (_, file, cb) => cb(null, file.originalname) }),
        }),
    )
    async importStudent(@UploadedFile() file: any,@GetUser() user) {
        // return this.importStudentService.importStudent(file.path,user)
        return "import học sinh"
    }
}