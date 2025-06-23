import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetAllLowStockNurseQuery {

    @ApiPropertyOptional({ example: 'ST0001', description: 'Tìm kiếm theo mã số học sinh hoặc tên học sinh' })
    @IsOptional()
    @IsString()
    search?: string;

}