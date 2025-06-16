import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class ChangePasswordDto {
    @ApiProperty({ example: '123456', description: 'Mật khẩu cũ' })
    @IsString()
    oldPassword: string;

    @ApiProperty({ example: '654321', description: 'Mật khẩu mới' })
    @IsString()
    newPassword: string;

    @ApiProperty({ example: '654321', description: 'Nhập lại mật khẩu mới' })
    @IsString()
    confirmPassword: string;


}
