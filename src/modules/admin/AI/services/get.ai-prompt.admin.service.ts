import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateAiPromptDto } from "../dtos/update.ai-prompt.admin.dto";
import { successResponse } from "src/common/utils/response.util";


@Injectable()
export class GetAiPromptAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async get() {
        const AIPromptEntity = await this.prisma.aIPrompt.findFirst()
        return successResponse(200, AIPromptEntity, 'Lấy  prompt AI thành công')
    }
}