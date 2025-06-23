import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {  IsOptional, IsString } from 'class-validator';

export class UpdateQuantityMedicineDto {
    @ApiProperty({ example: '23', description: 'Số lượng thuốc thêm' })
    @IsString()
    quantityToAdd: string;
}
