import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNumber, IsNumberString, IsOptional, IsString, Matches } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export class GetAllChatQuery {

    @ApiPropertyOptional({
        description: 'Trang hiện tại ( bắt đầu từ 1 ) ',
        example: 1
    })
    @IsOptional()
    @TransformToInt()
    @IsNumber()
    page?: number

    @ApiPropertyOptional({
        description: 'Số lượng tin nhắn trên trang',
        example: 5
    })
    @IsOptional()
    @TransformToInt()
    @IsNumber()
    limit?: number

    @ApiPropertyOptional({
        description: 'Sắp xếp theo trường nào (ví dụ: createdAt)',
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