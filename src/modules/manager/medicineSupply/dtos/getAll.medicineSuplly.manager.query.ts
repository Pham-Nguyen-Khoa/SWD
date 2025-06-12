import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";



export class GetAllMedicineSupplyQuery {
    @ApiPropertyOptional({
        description: 'Tìm kiếm tên vật tư ',
        example: 'Đo huyết áp'
    })
    @IsOptional()
    @IsString()
    search?: string

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

    @ApiPropertyOptional({
        description: 'Trang hiện tại ( bắt đầu từ 1 ) ',
        example: 1
    })
    @IsOptional()
    @TransformToInt()
    @IsNumber()
    page?: number

    @ApiPropertyOptional({
        description: 'Số lượng người dùng trên trang',
        example: 5
    })
    @IsOptional()
    @TransformToInt()
    @IsNumber()
    limit?: number

    @ApiPropertyOptional({
        description: 'Sắp xếp theo trường nào (ví dụ: createdAt, fullname)',
        example: 'createdAt',
    })
    @IsOptional()
    @IsString()
    sortBy?: string;

    @ApiPropertyOptional({
        description: 'Thứ tự sắp xếp: asc ( tăng dần ) hoặc desc ( giảm dần )',
        example: 'asc',
    })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc'

}