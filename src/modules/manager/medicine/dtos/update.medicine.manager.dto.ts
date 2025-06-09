import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum MedicineType {
    PELLETS = 'PELLETS',
    BOTTLE = 'BOTTLE',
    JAR = 'JAR',
}


export class UpdateMedicineDTO {
    @ApiPropertyOptional({ example: 'Vitamin C', description: 'Tên  thuốc' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiPropertyOptional({ example: '12', description: 'Số lượng thuốc' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    stock?: string;

    @ApiPropertyOptional({ example: 'Bổ sung vitamin c cho cơ thể', description: 'Mô tả thuốc', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ enum: MedicineType, example: MedicineType.PELLETS, description: 'Chai , viên , lọ ,cái' })
    @IsOptional()
    @IsEnum(MedicineType)
    type?: MedicineType;

    @ApiPropertyOptional({ example: '1', description: 'Thuộc danh mục nào', required: false })
    @IsOptional()
    @IsString()
    classifyID?: string;

    @ApiPropertyOptional({ example: '', description: 'Thuộc danh mục mới', required: false })
    @IsOptional()
    @IsOptional()
    @IsString()
    newClassifyName?: string;



    @ApiPropertyOptional({ example: 'Mỗi ngày uống 1 viên', description: 'Cách dùng thuốc', required: false })
    @IsOptional()
    @IsString()
    usage?: string;


}