import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class SendMailVaccinationEventDTO {
    @ApiPropertyOptional({ example: 'Tiêm vắc xin phòng cúm cho học sinh', description: 'Tiêu đề email ', required: false })
    @IsOptional()
    @IsString()
    customMailTitle?: string;
    @ApiPropertyOptional({ example: 'Đây là vacci cực kì tốt cho trẻ em khuyến khích phụ huynh nên tiêm cho học sinh', description: 'Nội dung chính trong email', required: false })
    @IsOptional()
    @IsString()
    customMailBody?: string;
}
