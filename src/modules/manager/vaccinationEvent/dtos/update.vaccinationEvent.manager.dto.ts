import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";



export enum VaccinationTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS',
}


export class UpdateVaccinationEventDTO {
    @ApiPropertyOptional({ example: 'Tên sự kiện tiêm chủng' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'Mô tả sự kiện tiêm chủng' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: '2025-06-30' })
    @IsOptional()
    @IsDateString()
    scheduledAt?: string;

    @ApiPropertyOptional({ enum: VaccinationTargetType, example: VaccinationTargetType.CLASS })
    @IsOptional()
    @IsEnum(VaccinationTargetType)
    targetType?: VaccinationTargetType;

    @ApiPropertyOptional({ type: [Number], example: [10, 11] })
    @IsOptional()
    @IsArray()
    targetIds?: number[];
}
