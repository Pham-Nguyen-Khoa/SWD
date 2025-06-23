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
    private readonly apiKey: string;

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService
    ) {
        const apiKey = process.env.HUGGINGFACE_API_KEY;
        if (!apiKey) {
            throw new Error('HUGGINGFACE_API_KEY is not defined in .env');
        }
        this.apiKey = apiKey;
    }

    // Phương thức để gọi API và trả lời câu hỏi
    async ask(data: AskAIDTO) {
        // const url = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';
        const url = 'https://huggingface.co/models/NousResearch/Nous-Hermes-2-Mistral-7B-DPO';
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
        };
        const AIPrompt = await this.prisma.aIPrompt.findFirst();
        const prompt = `${AIPrompt?.content} Câu hỏi của người dùng: ${data.message}`

        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    url,
                    { inputs: prompt },
                    { headers }
                )
            );

            console.log('HF response:', response.data);

            // Một số model trả về object, một số trả về array
            const generated = Array.isArray(response.data)
                ? response.data[0]?.generated_text
                : response.data?.generated_text;

            return generated ?? 'No response from model.';
        } catch (error) {
            console.error('Error calling Hugging Face API:', error.response?.data || error.message);
            throw new Error('Error calling Hugging Face API');
        }
    }

}
