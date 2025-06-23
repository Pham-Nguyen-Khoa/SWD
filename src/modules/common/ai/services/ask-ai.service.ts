import { AIPrompt } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AskAIDTO } from "../dtos/ask-ai.dto";
import { OpenAI } from 'openai';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';



@Injectable()

export class AskAIService {
    private openai = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: 'https://openrouter.ai/api/v1',
    });
    constructor(
        private readonly prisma: PrismaService,
    ) {
    }

    // Phương thức để gọi API và trả lời câu hỏi
    async ask(data: AskAIDTO) {
        const aiPrompt = await this.prisma.aIPrompt.findFirst();
        const prompt = `${aiPrompt?.content} Câu hỏi của người dùng: ${data.message}`


        const response = await this.openai.chat.completions.create({
            // model: 'mistralai/mistral-7b-instruct', // model miễn phí
            model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
            messages: [{ role: 'user', content: prompt }],
            stream: true, // bật chế độ stream
        });



        let fullResponse = '';

        for await (const chunk of response) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) fullResponse += content;
        }
        if (data.accountID) {
            fullResponse = fullResponse.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            await this.prisma.aIQuestionLog.create({
                data: {
                    accountID: parseInt(data.accountID),
                    question: data.message,
                    answer: fullResponse
                }
            })

        }
        return successResponse(200, fullResponse || 'Không có phản hồi.', "AI phản hồi thành công")

    }

}
