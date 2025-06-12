import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsNumberString, IsOptional, IsString, Matches } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";



export class GetAllMedicinerQuery {
    @ApiPropertyOptional({
        description: 'Tìm kiếm tên thuốc',
        example: 'vitamin a'
    })
    @IsOptional()
    @IsString()
    search?: string

    @ApiPropertyOptional({
        description: 'ID của danh mục thuốc',
        example: '1'
    })
    @IsOptional()
    @IsString()
    @Matches(/^\d+$/, {
        message: 'classifyID must be a string containing only digits',
    })
    classifyID?: string

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