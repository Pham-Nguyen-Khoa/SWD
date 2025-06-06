import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";




export class CreateMedicineClassifyDTO {
    @ApiProperty({ example: 'Đau bụng', description: 'Tên danh mục thuốc' })
    @IsString()
    @IsNotEmpty()
    name: string;

}