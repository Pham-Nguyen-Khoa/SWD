import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsInt, IsString, Matches } from "class-validator";


export class CreateStudentDto {

    @ApiProperty({ example: "Học sinh A", description: "Họ và tên học sinh" })
    @IsString()
    fullname: string

    @ApiProperty({ example: 'khoa10002000@gmail.com', description: 'Email' })
    @IsEmail()
    email: string

    @ApiProperty({ example: '2004-08-15', description: 'Ngày sinh, định dạng YYYY-MM-DD' })
    @IsDateString()
    dateOfBirth: string;

    @ApiProperty({ example: '12C11', description: 'Tên lớp' })
    @IsString()
    className: string;       

    // @ApiProperty({ example: '2025-2026', description: 'Năm học' })
    // @IsString()
    // academicYearName: string; 

    @ApiProperty({ example: 'Nam', description: 'Giới tính' })
    @IsEnum(['Nam', 'Nữ'])
    @IsString()
    gender: string


    @ApiProperty({ example: 'Phụ Huynh A', description: 'Tên phụ huynh' })
    @IsString()
    parentName: string


    @ApiProperty({ example: 'khoapnse183214@fpt.edu.vn', description: 'Email phụ huynh' })
    @IsString()
    parentEmail: string

    @ApiProperty({ example: '0382417490', description: 'Số điện thoại phụ huynh' })
    @IsString()
    @Matches(/^(0)(3|5|7|8|9)[0-9]{8}$/, {
        message: 'Số điện thoại không hợp lệ',
    })
    parentPhone: string;


}