import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMedicineLogDto {
    @ApiProperty({ example: '08:00', description: 'Khung giờ uống (HH:mm)' })
    @IsString()
    timeToTake: string;

    @ApiPropertyOptional({ example: 'Đã uống sau ăn', description: 'Ghi chú (tuỳ chọn)' })
    @IsOptional()
    @IsString()
    note?: string;
}
