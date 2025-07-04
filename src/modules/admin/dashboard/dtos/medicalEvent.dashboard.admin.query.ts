import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDateString, IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";


export class GetDashboardMedicalEventQuery {
    @ApiPropertyOptional({
        description: 'Lọc theo thời gian: ngày bắt đầu (yyyy-mm-dd)',
        example: '2025-07-01'
    })
    @IsOptional()
    @IsDateString()
    from?: string;

    @ApiPropertyOptional({
        description: 'Lọc theo thời gian: ngày kết thúc (yyyy-mm-dd)',
        example: '2025-07-31'
    })
    @IsOptional()
    @IsDateString()
    to?: string;

    @ApiPropertyOptional({
        description: 'Trường hợp đặc biệt: "all" để thống kê toàn bộ thời gian',
        example: 'all'
    })
    @IsOptional()
    @IsString()
    filter?: string;

    @ApiPropertyOptional({
        description: 'Lọc theo ID lớp học',
        example: '1'
    })
    @IsOptional()
    @IsString()
    classID?: string;



}