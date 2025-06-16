import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";


export enum MedicalEventSeverity {
    NORMAL = 'NORMAL',
    HOSPITAL = 'HOSPITAL',
}



export class CreateMedicalEventNurseDTO {
    @ApiPropertyOptional({ example: 'ST0001', description: 'Mã code học sinh' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    student_code: string;

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

    @ApiPropertyOptional({ enum: MedicalEventSeverity, example: MedicalEventSeverity.NORMAL, description: 'Mức độ nghiêm trọng sự kiện ( NORMAL OR HOSPITAL ) ' })
    @IsOptional()
    @IsEnum(MedicalEventSeverity)
    severity: MedicalEventSeverity;

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

}