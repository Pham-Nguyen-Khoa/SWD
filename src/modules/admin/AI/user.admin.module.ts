import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { UpdateAiPromptAdminService } from './services/update.ai-prompt.admin.service';
import { UpdateAIPromptAdminController } from './controllers/update.ai-prompt.admin.controller';
import { GetAIPromptAdminController } from './controllers/get.ai-prompt.admin.controller';
import { GetAiPromptAdminService } from './services/get.ai-prompt.admin.service';




const httpController = [
    UpdateAIPromptAdminController,
    GetAIPromptAdminController
]

const Services = [
    UpdateAiPromptAdminService,
    GetAiPromptAdminService,
    JwtService
]


@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class AiAdminModule { }
