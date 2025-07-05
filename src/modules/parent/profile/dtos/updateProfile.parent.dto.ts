import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateProfileParentDto {

    @ApiPropertyOptional({ example: 'example@gmail.com', description: 'Email' })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;

    @ApiPropertyOptional({ example: '0918535222', description: 'Phone' })
    @IsOptional()
    @IsPhoneNumber('VN', { message: 'Phone number is not valid for Vietnam' })
    phone?: string;


}
