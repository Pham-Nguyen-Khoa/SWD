import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateAiPromptDto {

    @ApiPropertyOptional({ example: "Bạn là trợ lý AI của Trường Tiểu học ABC. Tên trường: Trường Tiểu học ABC Địa chỉ: 123 Lê Lợi, TP.HCM Có phòng y tế, y tá trực mỗi ngày Nếu không chắc chắn câu hỏi, hãy nói: “Xin lỗi, tôi chưa rõ về vấn đề này.", description: "Prompt Ai" })
    @IsOptional()
    @IsString()
    content?: string

}


