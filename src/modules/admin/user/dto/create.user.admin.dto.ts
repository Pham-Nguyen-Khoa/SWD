import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

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

    @ApiProperty({ example: '1', description: 'RoleID ( Admin = 1, User = 2 ' })
    @IsString()
    roleID: string;
}
