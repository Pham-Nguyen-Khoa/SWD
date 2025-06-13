import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";




export class CreateMedicineSupplyDTO {
    @ApiProperty({ example: 'Vitamin C', description: 'Tên  thuốc' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'Bổ sung vitamin c cho cơ thể', description: 'Mô tả thuốc', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '12', description: 'Số lượng thuốc' })
    @IsString()
    @IsNotEmpty()
    stock: string;


    @ApiPropertyOptional({ example: 'Mỗi ngày uống 1 viên', description: 'Cách dùng thuốc', required: false })
    @IsOptional()
    @IsString()
    usage?: string;


    @ApiProperty({
        example: 'Vật tư',
        description: 'Thuộc danh mục nào',
        required: false,
        enum: ['Vật tư', 'Thiết bị', 'Tiêu hao']
    })
    @IsOptional()
    @IsString()
    @IsIn(['Vật tư', 'Thiết bị', 'Tiêu hao'], {
        message: 'Category phải là một trong: Vật tư, Thiết bị, Tiêu hao',
    })
    category?: string;



}