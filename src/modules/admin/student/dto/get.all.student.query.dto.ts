import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export enum RoleID {
    Admin = 1,
    Manager = 2,
    Nurse = 3,
    Parent = 4,
    Student = 5,
}


export class GetAllStudentQuery {
    @ApiPropertyOptional({
        description: 'Tìm kiếm theo tên hoặc email người dùng',
        example: 'example@gmail.com'
    })
    @IsOptional()
    @IsString()
    search?: string

    @ApiPropertyOptional({
        description: 'Tên lớp',
        example: '12C11'
    })
    @IsOptional()
    @IsString()
    className?: string


    @ApiPropertyOptional({
        description: 'Khối',
        example: '12'
    })
    @IsOptional()
    @IsString()
    grade?: string


    @ApiPropertyOptional({
        description: 'Năm học',
        example: '2025-2026'
    })
    @IsOptional()
    @IsString()
    academicYearName?: string

    @ApiPropertyOptional({
        description: 'Tốt nghiệp hay chưa',
        example: false,
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    graduated?: boolean;

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
        example: 'asc',
    })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc'

}