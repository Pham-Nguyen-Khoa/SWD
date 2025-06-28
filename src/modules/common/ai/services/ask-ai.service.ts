import { AIPrompt } from './../../../../../node_modules/.prisma/client/index.d';
import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AskAIDTO } from "../dtos/ask-ai.dto";
import { OpenAI } from 'openai';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';



@Injectable()

export class AskAIService {
    private genAI: GoogleGenerativeAI;
    constructor(
        private readonly prisma: PrismaService,
    ) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("API key is missing or undefined.");
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async ask(data: AskAIDTO) {
        const aiPrompt = await this.prisma.aIPrompt.findFirst();
        const prompt = `${aiPrompt?.content} Câu hỏi của người dùng: ${data.message}`
        const model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const fullResponse = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

        if (data.accountID) {
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
