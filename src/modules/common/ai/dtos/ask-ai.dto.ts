import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class AskAIDTO {
    @ApiProperty({ example: 'Trường bạn tên gì?', description: 'Câu hỏi gửi đến' })
    @IsString()
    message: string;

}
