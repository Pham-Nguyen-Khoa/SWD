import { GetAllChatQuery } from './../dtos/get-all-chat.query';
import { AIPrompt } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AskAIDTO } from "../dtos/ask-ai.dto";
import { OpenAI } from 'openai';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';



@Injectable()

export class GetAllChatService {
    constructor(
        private readonly prisma: PrismaService,
    ) {
    }
    async getAll(query: GetAllChatQuery, reqUser) {
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = query
        const skip = (page - 1) * limit;
        let whereClause: any = {
            accountID: reqUser.id
        }
        const allChats = await this.prisma.aIQuestionLog.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order
            },
        })
        return successResponse(200,allChats, 'Lấy ra lịch sử chat thành công')
    }

}
