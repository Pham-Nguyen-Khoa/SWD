import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DeclinedVaccinationEventParentDto {
    @ApiPropertyOptional({
        example: 'Cháu đã tiêm cái này rồi',
        description: "Note của phụ huynh khi từ chối "
    })
    @IsOptional()
    @IsString()
    note?: string
}