import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNumber, IsString } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export enum RoleID {
    Admin = 1,
    Manager = 2,
    Nurse = 3,
    Parent = 4,
    Student = 5,
}
export class CreateUserDto {
    @ApiProperty({ example: 'Neronmen', description: 'Họ và tên' })
    @IsString()
    fullname: string;

    @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Role (1=Admin, 2=Manager, 3=Nurse)',
        example: 2,
        enum: RoleID,
        enumName: 'roleID',
    })
    @TransformToInt()
    @IsNumber()
    @IsIn([1, 2, 3], {
        message: 'roleID phải là một trong các giá trị: 1, 2',
    })
    roleID: string
}
