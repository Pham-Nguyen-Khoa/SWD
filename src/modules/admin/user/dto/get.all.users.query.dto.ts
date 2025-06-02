import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export enum RoleID {
    Admin = 1,
    Manager = 2,
    Nurse = 3,
    Parent = 4,
    Student = 5,
}


export class GetAllUserQuery {
    @ApiPropertyOptional({
        description: 'Tìm kiếm theo tên hoặc email người dùng',
        example: 'example@gmail.com'
    })
    @IsOptional()
    @IsString()
    search?: string


    @ApiPropertyOptional({
        description: 'Tìm kiếm theo role (1=Admin, 2=Manager, 3=Nurse, 4=Parent, 5=Student)',
        example: 2,
        enum: RoleID,
        enumName: 'roleID',
    })
    @IsOptional()
    @TransformToInt()
    @IsNumber()
    @IsIn([1, 2, 3, 4, 5], {
        message: 'roleID phải là một trong các giá trị: 1, 2, 3, 4, 5',
    })
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