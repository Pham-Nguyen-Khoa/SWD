import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example: 'Neronmen', description: 'Họ và tên' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsString()
    fullname: string;

    @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsString()
    password: string;

}