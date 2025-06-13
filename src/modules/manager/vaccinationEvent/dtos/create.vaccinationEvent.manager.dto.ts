import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export enum VaccinationTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS',
}

class VaccineEventStockDto {
    @ApiPropertyOptional({ example: '1', description: 'ID thuốc' })
    @IsOptional()
    @IsInt()
    medicineID?: number;

    @ApiPropertyOptional({ example: '1', description: 'ID Vật tư chọn' })
    @IsOptional()
    @IsInt()
    medicineSupplyID?: number;

    @ApiProperty({ example: '12', description: 'Số lượng dự kiến' })
    @IsInt()
    quantityPlanned: number;

    @ApiProperty({ example: 'Không đủ thì báo thêm', description: 'Ghi chú thêm' })
    @IsOptional()
    @IsString()
    notes?: string;
}


export class CreateVaccinationEventDTO {
    @ApiProperty({ example: 'Chiến dịch tiêm chủng tháng 6', description: 'Tên sự kiện tiêm chủng' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Tiêm vắc xin phòng cúm cho học sinh', description: 'Mô tả chi tiết sự kiện', required: false })
    @IsString()
    description: string;

    @ApiProperty({ example: '2025-06-30', description: 'Thời gian dự kiến tổ chức' })
    @IsDateString()
    scheduledAt: string;

    @ApiProperty({ enum: VaccinationTargetType, example: VaccinationTargetType.CLASS, description: 'Loại đối tượng áp dụng (toàn trường, khối, lớp)' })
    @IsEnum(VaccinationTargetType)
    targetType: VaccinationTargetType;

    @ApiProperty({ example: [10, 11], description: 'Mảng các grade (nếu type = GRADE), hoặc classID (nếu type = CLASS). Nếu là SCHOOL thì để rỗng hoặc null' })
    @IsArray()
    @IsOptional()
    targetIds?: number[];


    @ApiProperty({
        description: 'Danh sách thuốc hoặc vật tư cần yêu cầu',
        type: [VaccineEventStockDto],
        example: [
            {
                medicineID: 1,
                quantityPlanned: 200,
                notes: 'Thiếu thì báo thêm'
            },
            {
                medicineSupplyID: 3,
                quantityPlanned: 5,
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VaccineEventStockDto)
    items: VaccineEventStockDto[];


}