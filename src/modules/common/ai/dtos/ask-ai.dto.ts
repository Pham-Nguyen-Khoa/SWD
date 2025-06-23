import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";



export class AskAIDTO {
    @ApiPropertyOptional({ example: '1', description: 'ID tài khoản' })
    @IsOptional()
    @IsString()
    accountID?: string;

    @ApiProperty({ example: 'Trường bạn tên gì?', description: 'Câu hỏi gửi đến' })
    @IsString()
    message: string;
}
