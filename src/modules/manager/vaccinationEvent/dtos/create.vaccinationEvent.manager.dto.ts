import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum VaccinationTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS',
}


export class CreateVaccinationEventDTO {
    @ApiProperty({ example: 'Chiến dịch tiêm chủng tháng 6', description: 'Tên sự kiện tiêm chủng' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Tiêm vắc xin phòng cúm cho học sinh', description: 'Mô tả chi tiết sự kiện', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2025-6-30', description: 'Thời gian dự kiến tổ chức' })
    @IsDateString()
    scheduledAt: string;

    @ApiProperty({ enum: VaccinationTargetType, example: VaccinationTargetType.CLASS, description: 'Loại đối tượng áp dụng (toàn trường, khối, lớp)' })
    @IsEnum(VaccinationTargetType)
    targetType: VaccinationTargetType;

    @ApiProperty({ example: [10, 11], description: 'Mảng các grade (nếu type = GRADE), hoặc classID (nếu type = CLASS). Nếu là SCHOOL thì để rỗng hoặc null' })
    @IsArray()
    @IsOptional()
    targetIds?: number[];
}