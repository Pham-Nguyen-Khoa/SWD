import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaModule } from "src/libs/prisma/prisma.module"
import { AskAIController } from "./controllers/ask-ai.controller"
import { AskAIService } from "./services/ask-ai.service"
import { HttpModule } from "@nestjs/axios"
import { GetAllChatService } from "./services/get-all-chat.service"
import { GetAllChatController } from "./controllers/get-all-chat.controller"

const httpController = [
    AskAIController,
    GetAllChatController
]

const Services = [
    AskAIService,
    GetAllChatService,
    JwtService
]


@Module({
    imports: [PrismaModule, HttpModule],
    controllers: [...httpController],
    providers: [...Services],
})
export class AIModule { }
