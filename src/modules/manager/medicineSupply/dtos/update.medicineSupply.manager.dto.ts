import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";




export class UpdateMedicineSupplyDTO {
    @ApiPropertyOptional({ example: 'Vitamin C', description: 'Tên  thuốc' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'Bổ sung vitamin c cho cơ thể', description: 'Mô tả thuốc', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: '12', description: 'Số lượng thuốc' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+$/, {
        message: 'stock phải là string số',
    })
    stock: string;


    @ApiPropertyOptional({ example: 'Mỗi ngày uống 1 viên', description: 'Cách dùng thuốc', required: false })
    @IsOptional()
    @IsString()
    usage?: string;


    @ApiPropertyOptional({
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