import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DeclinedCheckUpParentDto {
    @ApiPropertyOptional({
        example: 'Không cho cháu khám đâu lêu lêu',
        description: "Note của phụ huynh khi từ chối "
    })
    @IsOptional()
    @IsString()
    note?: string
}