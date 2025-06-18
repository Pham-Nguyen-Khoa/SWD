import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { TreatmentDto } from "./create.treatment.nurse.dto";


export enum MedicalEventSeverity {
    NORMAL = 'NORMAL',
    HOSPITAL = 'HOSPITAL',
}


export class UpdateMedicalEventNurseDTO {


    @ApiPropertyOptional({ example: 'Sốt', description: 'Loại sự kiện', required: false })
    @IsOptional()
    @IsString()
    type: string;

    @ApiPropertyOptional({ example: '2025-06-30T14:00:00', description: 'Thời gian xảy ra' })
    @IsOptional()
    @IsDateString()
    occurredAt: string;

    @ApiPropertyOptional({ example: 'Người cháu bị nóng lên chắc do thời tiết lạnh', description: 'Mô tả  sự kiện', required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({
        example: 'Người cháu bị nóng lên chắc do thời tiết lạnh',
        description: 'Mô tả sự kiện',
        required: false,
    })
    @IsOptional()
    @IsString()
    @ValidateIf(o => o.severity === MedicalEventSeverity.HOSPITAL)
    hospitalName?: string;
    @ApiPropertyOptional({
        example: '2025-06-30T14:00:00',
        description: 'Thời gian chuyển',
    })
    @IsOptional()
    @IsDateString()
    @ValidateIf(o => o.severity === MedicalEventSeverity.HOSPITAL)
    transferredAt?: string;

    @ApiPropertyOptional({
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
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TreatmentDto)
    items: TreatmentDto[];

}