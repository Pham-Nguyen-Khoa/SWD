import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";


export enum MedicalEventSeverity {
    NORMAL = 'NORMAL',
    HOSPITAL = 'HOSPITAL',
}



export class CreateMedicalEventNurseDTO {
    @ApiProperty({ example: 'ST0001', description: 'Mã code học sinh' })
    @IsString()
    @IsNotEmpty()
    student_code: string;

    @ApiProperty({ example: 'Sốt', description: 'Loại sự kiện', required: false })
    @IsString()
    type: string;


    @ApiProperty({ example: '2025-06-30T14:00:00', description: 'Thời gian xảy ra' })
    @IsDateString()
    occurredAt: string;

    @ApiProperty({ example: 'Người cháu bị nóng lên chắc do thời tiết lạnh', description: 'Mô tả  sự kiện', required: false })
    @IsString()
    description: string;

    @ApiProperty({ enum: MedicalEventSeverity, example: MedicalEventSeverity.NORMAL, description: 'Mức độ nghiêm trọng sự kiện ( NORMAL OR HOSPITAL ) ' })
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