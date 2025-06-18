import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsString, Min, ArrayNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class CreateMedicineItemDto {
    @ApiProperty({ example: 'Paracetamol', description: 'Tên thuốc' })
    @IsString()
    medicineName: string;

    @ApiProperty({ example: '5ml', description: 'Liều lượng mỗi lần uống' })
    @IsString()
    dosage: string;

    @ApiProperty({ example: "6", description: 'Tổng số liều/lọ thuốc được phụ huynh gửi' })
    @IsString()
    quantitySent: string;

    @ApiProperty({ example: ['08:00', '14:00'], description: 'Giờ uống thuốc mỗi ngày (định dạng HH:mm)' })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    usageTimes: string[];

    @ApiProperty({ example: '2025-06-20', description: 'Ngày bắt đầu uống thuốc (YYYY-MM-DD)' })
    @IsDateString()
    startDate: string;

    @ApiProperty({ example: '2025-06-22', description: 'Ngày kết thúc uống thuốc (YYYY-MM-DD)' })
    @IsDateString()
    endDate: string;
}



export class CreateMedicineRequestDto {
    @ApiProperty({ example: 5, description: 'ID học sinh' })
    @IsInt()
    studentID: number;

    @ApiPropertyOptional({ example: 'Bé sốt nhẹ và tiêu chảy', description: 'Ghi chú thêm (tuỳ chọn)' })
    @IsOptional()
    @IsString()
    note?: string;

    @ApiProperty({
        description: 'Danh sách các loại thuốc gửi đến trường',
        type: [CreateMedicineItemDto],
        example: [
            {
                medicineName: "Paracetamol",
                dosage: "5ml",
                quantitySent: "6",
                usageTimes: [
                    "08:00",
                    "14:00"
                ],
                startDate: "2025-06-20",
                endDate: "2025-06-22"
            },
            {
                medicineName: "Thuốc ho Prospan",
                dosage: "10ml",
                quantitySent: "6",
                usageTimes: [
                    "09:00"
                ],
                startDate: "2025-06-20",
                endDate: "2025-06-21"
            }

        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMedicineItemDto)
    items: CreateMedicineItemDto[];
}