import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Matches } from "class-validator";


export class UpdateStudentDto {

    @ApiPropertyOptional({ example: "Học sinh A", description: "Họ và tên học sinh" })
    @IsOptional()
    @IsString()
    fullname?: string

    @ApiPropertyOptional({ example: 'khoa10002000@gmail.com', description: 'Email' })
    @IsOptional()

    @IsEmail()
    email?: string

    @ApiPropertyOptional({ example: '123456', description: 'Password' })
    @IsOptional()
    @IsString()
    password?: string

    @ApiPropertyOptional({ example: '2004-08-15', description: 'Ngày sinh, định dạng YYYY-MM-DD' })
    @IsOptional()
    @IsDateString()
    dateOfBirth?: string;

    @ApiPropertyOptional({ example: '12C11', description: 'Tên lớp học' })
    @IsOptional()
    @IsString()
    className?: string

    @ApiPropertyOptional({ example: 'Nam', description: 'Giới tính' })
    @IsOptional()
    @IsEnum(['Nam', 'Nữ'])
    @IsString()
    gender?: string


    @ApiPropertyOptional({ example: 'Phụ Huynh A', description: 'Tên phụ huynh' })
    @IsOptional()
    @IsString()
    parentName?: string


    @ApiPropertyOptional({ example: 'khoapnse183214@fpt.edu.vn', description: 'Email phụ huynh' })
    @IsOptional()
    @IsString()
    parentEmail?: string

    @ApiPropertyOptional({ example: '0382417490', description: 'Số điện thoại phụ huynh' })
    @IsOptional()
    @IsString()
    @Matches(/^(0)(3|5|7|8|9)[0-9]{8}$/, {
        message: 'Số điện thoại không hợp lệ',
    })
    parentPhone?: string;


}