import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsEmail, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export class VaccineEntryDto {
    @ApiPropertyOptional({ example: 1, description: 'ID của vaccine' })
    @IsOptional()
    @IsInt()
    id: number;
}
export class UpdateHealthProfileDTO {

    @ApiPropertyOptional({ example: '172', description: 'Chiều cao của học sinh' })
    @IsOptional()
    @IsString()
    height: string;

    @ApiPropertyOptional({ example: '42', description: 'Cân nặng của học sinh' })
    @IsOptional()
    @IsString()
    weight: string;

    @ApiPropertyOptional({ example: 'A', description: 'Nhóm máu của học sinh' })
    @IsOptional()
    @IsString()
    bloodGroup: string;

    @ApiPropertyOptional({ example: "Cháu đã có lần phẫu thuật chân vì bị đứt dây chằng", description: 'Lịch sử điều trị' })
    @IsOptional()
    @IsString()
    treatmentHistory: string

    @ApiPropertyOptional({
        example: "Mong nhà trường để ý tới bé nhiều hơn ",
        description: 'Ghi chú bổ sung của phụ huynh',
    })
    @IsOptional()
    @IsString()
    additionalNote: string;

    @ApiPropertyOptional({ example: false, description: 'Học sinh có  bị dị ứng không?', type: Boolean })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    hasNoAllergies?: boolean

    @ApiPropertyOptional({
        example: [1, 2],
        description: 'Danh sách ID dị ứng đã chọn',
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    @Type(() => Number)
    selectedAllergyIds: number[];

    @ApiPropertyOptional({ example: "Cháu bị dị ứng thời tiết lạnh", description: 'Dị ứng khác' })
    @IsOptional()
    @IsString()
    detailAllergies: string

    @ApiPropertyOptional({ example: "Cháu bị dị ứng thời tiết lạnh", description: 'Phương pháp điều trị' })
    @IsOptional()
    @IsString()
    methodAllergies: string


    @ApiPropertyOptional({ example: false, description: 'Học sinh có mắc bệnh mãn tính không?', type: Boolean })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    hasNochronicDiseases?: boolean

    @ApiPropertyOptional({
        example: [1, 2, 3, 4, 5],
        description: 'Danh sách ID bệnh mãn tính đã chọn',
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    @Type(() => Number)
    selectedChronicDiseases: number[];

    @ApiPropertyOptional({ example: "Cháu bị overthinking", description: 'Chi tiết bệnh mãn tính' })
    @IsOptional()
    @IsString()
    detailChronicDiseases: string

    @ApiPropertyOptional({ example: "Tôi thường cho em đi du lịch sau kì học", description: 'Phương pháp điều trị' })
    @IsOptional()
    @IsString()
    methodChronicDiseases: string

    @ApiPropertyOptional({
        example: "Em uống paradon 2 viên mỗi ngày ( buổi sáng và buổi tối ) ",
        description: 'Note thuốc học sinh đang sử dụng',
    })
    @IsOptional()
    @IsString()
    medicationNote: string;


    @ApiPropertyOptional({
        example: "-2",
        description: 'Mắt trái',
    })
    @IsOptional()
    @IsString()
    visionLeft: string;

    @ApiPropertyOptional({
        example: "0",
        description: 'Mắt phải',
    })
    @IsOptional()
    @IsString()
    visionRight: string;


    @ApiPropertyOptional({ example: false, description: 'Học sinh có đeo kính không?', type: Boolean })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    wearGlasses?: boolean

    @ApiPropertyOptional({
        example: "Mắt bé kém nên nhìn xa không được rõ",
        description: 'Ghi chú về thị lực',
    })
    @IsOptional()
    @IsString()
    noteVision: string



    @ApiPropertyOptional({
        example: "Bình thường",
        description: 'Tai trái',
    })
    @IsOptional()
    @IsString()
    hearingLeft: string;

    @ApiPropertyOptional({
        example: "Bình thường",
        description: 'Tai phải',
    })
    @IsOptional()
    @IsString()
    hearingRight: string;

    @ApiPropertyOptional({ example: false, description: 'Học sinh có sử dụng thiết bị trợ thính không?', type: Boolean })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    hearingAid?: boolean


    @ApiPropertyOptional({
        example: "Tai của bé nghe ổn",
        description: 'Ghi chú về thính lực',
    })
    @IsOptional()
    @IsString()
    noteHearing: string;

    @ApiPropertyOptional({
        description: 'Danh sách vaccine đã chọn kèm trạng thái',
        example: [1, 2, 3],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    @Type(() => Number)
    selectedVaccinations: number[];


    @ApiPropertyOptional({
        example: "Năm 2021 bé có tiêm 1 mũi vaccine covid 19",
        description: 'Lịch sử tiêm chủng',
    })
    @IsOptional()
    @IsString()
    vaccinationHistory: string;

    @ApiProperty({ example: false, description: 'Học sinh có phản ứng phụ sau tiêm không?', type: Boolean })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    sideEffect?: boolean

    @ApiProperty({
        example: "Bé bị giựt giựt kiểu shock thuốc",
        description: 'Chi tiết phản ứng phụ',
    })
    @IsOptional()
    @IsString()
    DetailSideEffect: string;


}
