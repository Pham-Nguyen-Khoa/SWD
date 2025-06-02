import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
    ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export enum InjectionResult {
    GOOD = "GOOD",
    BAD = "BAD",
    NOT_EVALUATED = "NOT_EVALUATED"
}

export enum InjectionStatus {
    SUCCESS = "SUCCESS",
    SKIPPED = "SKIPPED"
}

export class VaccinationResultDto {
    @ApiProperty({ example: 101, description: 'ID của học sinh' })
    @IsInt()
    studentID: number;

    @ApiProperty({
        example: 'SUCCESS',
        enum: InjectionStatus,
        description: 'Trạng thái tiêm (Đã tiêm SUCCESS  và vắng mặt SKIPPED)',
    })
    @IsEnum(InjectionStatus)
    status: InjectionStatus;

    @ApiProperty({
        example: 'Không có phản ứng phụ',
        description: 'Ghi chú thêm (tùy chọn)',
        required: false,
    })
    @IsOptional()
    @IsString()
    note?: string;

    @ApiProperty({
        example: 'GOOD',
        enum: InjectionResult,
        description: 'Kết quả ( GOOD hoặc BAD ) ',
    })
    @IsEnum(InjectionResult)
    result: InjectionResult;
}

export class ResultVaccinationEventNurseDto {
    @ApiProperty({
        type: [VaccinationResultDto],
        description: 'Danh sách kết quả tiêm chủng cho từng học sinh',
    })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => VaccinationResultDto)
    result: VaccinationResultDto[];
}
