import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example: 'Neronmen', description: 'Họ và tên' })
    @IsString()
    fullname: string;

    @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
    @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
        message: 'Chỉ chấp nhận địa chỉ Gmail',
    })  
    email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @IsString()
    password: string;

}