import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class SendMailCheckUpDTO {
    @ApiPropertyOptional({ example: 'Kiểm tra sức khỏe định kỳ giữa năm', description: 'Tiêu đề email ', required: false })
    @IsOptional()
    @IsString()
    customMailTitle?: string;
    @ApiPropertyOptional({ example: 'Kiểm tra sức khỏe tổng quát cho bé', description: 'Nội dung chính trong email', required: false })
    @IsOptional()
    @IsString()
    customMailBody?: string;
}
