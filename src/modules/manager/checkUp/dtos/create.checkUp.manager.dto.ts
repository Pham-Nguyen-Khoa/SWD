import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsArray,
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";

export enum HealthCheckupTargetType {
    SCHOOL = 'SCHOOL',
    GRADE = 'GRADE',
    CLASS = 'CLASS',
}

export enum HealthInputType {
    NUMBER = 'NUMBER',
    TEXT = 'TEXT',
    BOOLEAN = 'BOOLEAN'
}

class HealthCheckupStockDto {
    @ApiPropertyOptional({ example: '1', description: 'ID thuốc sử dụng trong khám sức khỏe' })
    @IsOptional()
    @IsInt()
    medicineID?: number;

    @ApiPropertyOptional({ example: '2', description: 'ID vật tư y tế sử dụng trong khám sức khỏe' })
    @IsOptional()
    @IsInt()
    medicineSupplyID?: number;

    @ApiProperty({ example: 20, description: 'Số lượng dự kiến sử dụng' })
    @IsInt()
    quantityPlanned: number;

    @ApiPropertyOptional({ example: 'Mang thêm nếu có thể', description: 'Ghi chú thêm nếu có' })
    @IsOptional()
    @IsString()
    notes?: string;
}

class HealthCheckupContentDto {
    @ApiProperty({ example: 'Đo chiều cao', description: 'Tên nội dung kiểm tra sức khỏe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'Đo bằng thước y tế tiêu chuẩn', description: 'Ghi chú mô tả chi tiết' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ enum: HealthInputType, example: HealthInputType.NUMBER, description: 'Loại dữ liệu cần nhập cho nội dung này' })
    @IsEnum(HealthInputType)
    inputType: HealthInputType;
}

export class CreateHealthCheckupDTO {
    @ApiProperty({ example: 'Khám sức khỏe học kỳ 2', description: 'Tên đợt khám sức khỏe' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: 'Khám định kỳ giữa năm cho học sinh', description: 'Mô tả chi tiết sự kiện' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2025-07-15', description: 'Thời gian dự kiến tổ chức' })
    @IsDateString()
    scheduledAt: string;

    @ApiProperty({ enum: HealthCheckupTargetType, example: HealthCheckupTargetType.CLASS, description: 'Loại đối tượng kiểm tra' })
    @IsEnum(HealthCheckupTargetType)
    targetType: HealthCheckupTargetType;

    @ApiProperty({ example: [2, 3], description: 'Mảng các ID lớp hoặc khối, tùy thuộc vào targetType. Nếu SCHOOL thì để trống' })
    @IsOptional()
    @IsArray()
    targetIds?: number[];

    @ApiProperty({
        description: 'Danh sách thuốc/vật tư y tế cần chuẩn bị',
        type: [HealthCheckupStockDto],
        example: [
            { medicineID: 1, quantityPlanned: 10, notes: 'Mang thêm nếu có thể' },
            { medicineSupplyID: 2, quantityPlanned: 5 }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HealthCheckupStockDto)
    items: HealthCheckupStockDto[];

    @ApiProperty({
        description: 'Danh sách nội dung kiểm tra sức khỏe',
        type: [HealthCheckupContentDto],
        example: [
            { name: 'Đo cân nặng', inputType: "Number" },
            { name: 'Đo thị lực', description: 'Kiểm tra mắt trái, mắt phải', inputType: "TEXT" }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HealthCheckupContentDto)
    checkupContents: HealthCheckupContentDto[];
}
