import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";



export class TreatmentDto {
    @ApiPropertyOptional({ example: '1', description: 'ID thuốc' })
    @IsOptional()
    @IsInt()
    medicineID?: number;

    @ApiPropertyOptional({ example: '1', description: 'ID Vật tư chọn' })
    @IsOptional()
    @IsInt()
    medicineSupplyID?: number;

    @ApiProperty({ example: '12', description: 'Số lượng dùng' })
    @IsInt()
    quantity: number;

    @ApiProperty({ example: 'Cho cháu uống 5 viên vitamin c là đủ', description: 'Ghi chú thêm' })
    @IsOptional()
    @IsString()
    dosage?: string;
}


export class CreateTreatmentDTO {
    @ApiProperty({
        description: 'Danh sách thuốc hoặc vật tư cần yêu cầu',
        type: [TreatmentDto],
        example: [
            {
                medicineID: 9,
                quantity: 5,
                dosage: 'Cho cháu uống 5 viên vitamin c là đủ'
            },
            {
                medicineSupplyID: 3,
                quantity: 3,
                dosage: 'Dù 3 kiêm tiêm chích 3 lần'
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TreatmentDto)
    items: TreatmentDto[];


}