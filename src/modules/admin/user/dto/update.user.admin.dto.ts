import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export enum RoleID {
    Admin = 1,
    Manager = 2,
    Nurse = 3,
    Parent = 4,
    Student = 5,
}
export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'Neronmen', description: 'Họ và tên' })
    @IsOptional()
    @IsString()
    fullname?: string;

    @ApiPropertyOptional({ example: 'example@gmail.com', description: 'Email' })
    @IsOptional()

    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: '123456', description: 'Password' })
    @IsOptional()

    @IsString()
    password?: string;

    @ApiPropertyOptional({
        description: 'Role (1=Admin, 2=Manager, 3=Nurse)',
        example: 2,
        enum: RoleID,
        enumName: 'roleID',
    })
    @IsOptional()
    @TransformToInt()
    @IsNumber()
    @IsIn([1, 2, 3], {
        message: 'roleID phải là một trong các giá trị: 1, 2,3',
    })
    roleID?: string
}
