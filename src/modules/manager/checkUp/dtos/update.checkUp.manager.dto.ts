import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";



export enum CheckUpTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS',
}


export class UpdateCheckUpDTO {
    @ApiPropertyOptional({ example: 'Tên sự kiện khám sức khỏe định kỳ' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ example: 'Mô tả sự kiện khám sức khỏe định kỳ' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: '2025-06-30' })
    @IsOptional()
    @IsDateString()
    scheduledAt?: string;

    @ApiPropertyOptional({ enum: CheckUpTargetType, example: CheckUpTargetType.GRADE })
    @IsOptional()
    @IsEnum(CheckUpTargetType)
    targetType?: CheckUpTargetType;

    @ApiPropertyOptional({ type: [Number], example: [10, 11] })
    @IsOptional()
    @IsArray()
    targetIds?: number[];
}
