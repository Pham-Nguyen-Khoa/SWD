import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum MedicineType {
    PELLETS = 'PELLETS',
    BOTTLE = 'BOTTLE',
    JAR = 'JAR',
}


export class CreateMedicineDTO {
    @ApiProperty({ example: 'Vitamin C', description: 'Tên  thuốc' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '12', description: 'Số lượng thuốc' })
    @IsString()
    @IsNotEmpty()
    stock: string;

    @ApiPropertyOptional({ example: 'Bổ sung vitamin c cho cơ thể', description: 'Mô tả thuốc', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ enum: MedicineType, example: MedicineType.PELLETS, description: 'Chai , viên , lọ ,cái' })
    @IsEnum(MedicineType)
    type: MedicineType;

    @ApiProperty({ example: '1', description: 'Thuộc danh mục nào', required: false })
    @IsString()
    classifyID: string;

    @ApiPropertyOptional({ example: '', description: 'Thuộc danh mục mới', required: false })
    @IsOptional()
    @IsString()
    newClassifyName?: string;



    @ApiPropertyOptional({ example: 'Mỗi ngày uống 1 viên', description: 'Cách dùng thuốc', required: false })
    @IsOptional()
    @IsString()
    usage?: string;


}