import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateAiPromptDto } from "../dtos/update.ai-prompt.admin.dto";
import { successResponse } from "src/common/utils/response.util";


@Injectable()
export class UpdateAiPromptAdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async update(data: UpdateAiPromptDto, reqUser) {

        const AIPromptEntity = await this.prisma.aIPrompt.findFirst()
        if (!AIPromptEntity) {
            return
        }

        const updateAiPromptEntity = await this.prisma.aIPrompt.update({
            where: { id: AIPromptEntity.id },
            data: {
                content: data.content,
                updatedBy: reqUser.id
            }
        })
        return successResponse(200, updateAiPromptEntity, 'Cập nhật prompt AI thành công')
    }
}