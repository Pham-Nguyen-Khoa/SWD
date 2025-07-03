import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsIn, IsNumber, IsNumberString, IsOptional, IsString, ValidateIf } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";



export enum VaccinationTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS',
}


export class GetTotalStudentQuery {
    @ApiProperty({ enum: VaccinationTargetType, example: VaccinationTargetType.CLASS, description: 'Loại đối tượng áp dụng (toàn trường, khối, lớp)' })
    @IsEnum(VaccinationTargetType)
    targetType: VaccinationTargetType;

    @ApiPropertyOptional({
        description: 'Mảng các grade (nếu type = GRADE), hoặc classID (nếu type = CLASS). Nếu type = SCHOOL thì để rỗng hoặc null.',
        example: '["10", "11"]',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ValidateIf((o) => o.type === VaccinationTargetType.GRADE || o.type === VaccinationTargetType.CLASS)
    targetIds?: string[];
}