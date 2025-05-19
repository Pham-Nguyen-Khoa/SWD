import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";


export class GetAllUserQuery {
    @ApiPropertyOptional({
        description: 'Tìm kiếm theo tên hoặc email người dùng',
        example: 'example@gmail.com'
    })
    @IsOptional()
    @IsString()
    search?: string

    @ApiPropertyOptional({
        description: 'Tìm kiếm theo role ( Admin = 1 , User = 2) ',
        example: 2
    })
    @IsOptional()
    @TransformToInt()
    @IsNumber()
    roleID?: string

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
        example: 1
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
        example: 'desc',
    })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc'

}