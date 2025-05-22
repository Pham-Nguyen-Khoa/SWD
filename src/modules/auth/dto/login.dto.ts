import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"


export class LoginDto {
    @ApiProperty({
        example: 'admin@gmail.com', description: 'Email'
    })
    @IsEmail()
    email: string
    @ApiProperty({
        example: '123456', description: 'Password'
    })
    @IsString()
    password: string
}