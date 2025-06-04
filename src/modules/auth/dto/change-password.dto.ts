import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"


export class ChangePasswordDto {
    @ApiProperty({
        example: '123456', description: 'Current Password'
    })
    @IsString()
    @MinLength(6, { message: 'Current password must be at least 6 characters long' })
    currentPassword: string
    @ApiProperty({
        example: '123456', description: 'New Password'
    })
    @IsString()
    @MinLength(6, { message: 'Current password must be at least 6 characters long' })
    newPassword: string
}