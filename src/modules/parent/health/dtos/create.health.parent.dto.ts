import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsEmail, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export class VaccineEntryDto {
    @ApiProperty({ example: 1, description: 'ID của vaccine' })
    @IsInt()
    id: number;
}

export class CreateHealthProfileDTO {
    @ApiProperty({ example: '1', description: 'ID học sinh được tạo hồ sơ' })
    @IsString()
    studentID: string;

    @ApiProperty({ example: '172', description: 'Chiều cao của học sinh' })
    @IsString()
    height: string;

    @ApiProperty({ example: '42', description: 'Cân nặng của học sinh' })
    @IsString()
    weight: string;

    @ApiProperty({ example: 'A', description: 'Nhóm máu của học sinh' })
    @IsString()
    bloodGroup: string;

    @ApiProperty({ example: "Cháu đã có lần phẫu thuật chân vì bị đứt dây chằng", description: 'Lịch sử điều trị' })
    @IsString()
    treatmentHistory: string

    @ApiProperty({
        example: "Mong nhà trường để ý tới bé nhiều hơn ",
        description: 'Ghi chú bổ sung của phụ huynh',
    })
    @IsString()
    additionalNote: string;

    @ApiProperty({ example: false, description: 'Học sinh có  bị dị ứng không?', type: Boolean })
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    hasNoAllergies?: boolean

    @ApiProperty({
        example: [1, 2],
        description: 'Danh sách ID dị ứng đã chọn',
        type: [Number],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    @Type(() => Number)
    selectedAllergyIds: number[];

    @ApiProperty({ example: "Cháu bị dị ứng thời tiết lạnh", description: 'Dị ứng khác' })
    @IsString()
    detailAllergies: string

    @ApiProperty({ example: "Cháu bị dị ứng thời tiết lạnh", description: 'Phương pháp điều trị' })
    @IsString()
    methodAllergies: string


    @ApiProperty({ example: false, description: 'Học sinh có mắc bệnh mãn tính không?', type: Boolean })
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    hasNochronicDiseases?: boolean

    @ApiProperty({
        example: [1, 2, 3, 4, 5],
        description: 'Danh sách ID bệnh mãn tính đã chọn',
        type: [Number],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    @Type(() => Number)
    selectedChronicDiseases: number[];

    @ApiProperty({ example: "Cháu bị overthinking", description: 'Chi tiết bệnh mãn tính' })
    @IsString()
    detailChronicDiseases: string

    @ApiProperty({ example: "Tôi thường cho em đi du lịch sau kì học", description: 'Phương pháp điều trị' })
    @IsString()
    methodChronicDiseases: string

    @ApiProperty({
        example: "Em uống paradon 2 viên mỗi ngày ( buổi sáng và buổi tối ) ",
        description: 'Note thuốc học sinh đang sử dụng',
    })
    @IsString()
    medicationNote: string;


    @ApiProperty({
        example: "-2",
        description: 'Mắt trái',
    })
    @IsString()
    visionLeft: string;

    @ApiProperty({
        example: "0",
        description: 'Mắt phải',
    })
    @IsString()
    visionRight: string;


    @ApiProperty({ example: false, description: 'Học sinh có đeo kính không?', type: Boolean })
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    wearGlasses?: boolean

    @ApiProperty({
        example: "Mắt bé kém nên nhìn xa không được rõ",
        description: 'Ghi chú về thị lực',
    })
    @IsString()
    noteVision: string



    @ApiProperty({
        example: "Bình thường",
        description: 'Tai trái',
    })
    @IsString()
    hearingLeft: string;

    @ApiProperty({
        example: "Bình thường",
        description: 'Tai phải',
    })
    @IsString()
    hearingRight: string;

    @ApiProperty({ example: false, description: 'Học sinh có sử dụng thiết bị trợ thính không?', type: Boolean })
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    hearingAid?: boolean


    @ApiProperty({
        example: "Tai của bé nghe ổn",
        description: 'Ghi chú về thính lực',
    })
    @IsString()
    noteHearing: string;

    @ApiProperty({
        description: 'Danh sách vaccine đã chọn kèm trạng thái',
        example: [1, 2, 3],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    @Type(() => Number)
    selectedVaccinations: number[];


    @ApiProperty({
        example: "Năm 2021 bé có tiêm 1 mũi vaccine covid 19",
        description: 'Lịch sử tiêm chủng',
    })
    @IsString()
    vaccinationHistory: string;

    @ApiProperty({ example: false, description: 'Học sinh có phản ứng phụ sau tiêm không?', type: Boolean })
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    sideEffect?: boolean

    @ApiProperty({
        example: "Bé bị giựt giựt kiểu shock thuốc",
        description: 'Chi tiết phản ứng phụ',
    })
    @IsString()
    DetailSideEffect: string;

















}
