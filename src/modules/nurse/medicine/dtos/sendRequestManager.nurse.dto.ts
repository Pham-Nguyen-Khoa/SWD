import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";




enum UrgencyLevel {
    NORMAL = 'NORMAL',
    URGENT = 'URGENT',
}

class RequestItemDto {
    @ApiPropertyOptional({ example: '1', description: 'ID thuốc' })
    @IsOptional()
    @IsInt()
    medicineID?: number;

    @ApiPropertyOptional({ example: '1', description: 'ID Vật tư chọn' })
    @IsOptional()
    @IsInt()
    medicineSupplyID?: number;

    @ApiProperty({ example: '12', description: 'Số lượng' })
    @IsInt()
    quantity: number;

    @ApiProperty({ example: 'NORMAL', description: 'NORMAL hay URGENT ( bình thường hay gấp ) ' })
    @IsEnum(UrgencyLevel)
    urgency: UrgencyLevel;

    @ApiProperty({ example: 'Sắp hết rồi ', description: 'Ghi chú thêm' })
    @IsOptional()
    @IsString()
    note?: string;
}

export class SendRequestManagerDTO {
    @ApiProperty({ example: 'Sắp hết tới có cuộc tiêm chủng nên cần nhiều hàng ', description: 'Ghi chú ' })
    @IsOptional()
    @IsString()
    note?: string;

    @ApiProperty({
        description: 'Danh sách thuốc hoặc vật tư cần yêu cầu',
        type: [RequestItemDto], // rất quan trọng để Swagger hiểu đây là mảng
        example: [
            {
                medicineID: 1,
                quantity: 10,
                urgency: 'gấp',
                note: 'Sắp hết rồi'
            },
            {
                medicineSupplyID: 3,
                quantity: 5,
                urgency: 'bình thường'
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RequestItemDto)
    items: RequestItemDto[];

}