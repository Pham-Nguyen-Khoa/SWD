import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
    ArrayNotEmpty,
    IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export enum InjectionResult {
    GOOD = "GOOD",
    BAD = "BAD",
    NOT_EVALUATED = "NOT_EVALUATED"
}

export enum InjectionStatus {
    SUCCESS = "SUCCESS",
    SKIPPED = "SKIPPED"
}

class CheckupResultItemDto {
    @ApiProperty({ example: 1, description: 'ID nội dung kiểm tra' })
    @IsInt()
    contentID: number;

    @ApiProperty({ example: '145 cm', description: 'Giá trị kết quả' })
    @IsString()
    value: string;

    @ApiProperty({ example: 'Chiều cao thấp hơn chuẩn', required: false })
    @IsOptional()
    @IsString()
    note?: string;
}

export class CheckUpResultDto {
    @ApiProperty({ example: 101, description: 'ID của học sinh' })
    @IsInt()
    studentID: number;

    @ApiPropertyOptional({
        type: [CheckupResultItemDto],
        description: 'Danh sách kết quả từng nội dung kiểm tra',
        required: false,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CheckupResultItemDto)
    results?: CheckupResultItemDto[];

    @ApiPropertyOptional({
        description: 'Có bất thường không?',
        example: false,
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isMeeting?: boolean;


    @ApiProperty({
        example: 'SUCCESS',
        enum: InjectionStatus,
        description: 'Trạng thái hoạt động(Có mặt SUCCESS  và vắng mặt SKIPPED)',
    })
    @IsEnum(InjectionStatus)
    status: InjectionStatus;

    @ApiPropertyOptional({
        example: 'Không có phản ứng phụ',
        description: 'Mô tả tổng quan',
        required: false,
    })
    @IsOptional()
    @IsString()
    overallNotes?: string;



    @ApiPropertyOptional({
        example: 'GOOD',
        enum: InjectionResult,
        description: 'Kết quả ( GOOD hoặc BAD ) ',
    })
    @IsOptional()
    @IsEnum(InjectionResult)
    overallResult?: InjectionResult;

}

