import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class GetDetailVaccinationEventQuery {
    @ApiPropertyOptional({
        description: 'Tìm kiếm theo tên hoặc email người dùng',
        example: 'example@gmail.com'
    })
    @IsOptional()
    @IsString()
    search?: string

}