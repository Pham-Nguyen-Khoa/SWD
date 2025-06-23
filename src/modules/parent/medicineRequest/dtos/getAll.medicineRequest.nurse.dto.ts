import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export enum MedicineRequestStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    COMPLETED = 'COMPLETED',
    REJECTED = 'REJECTED',
}


export class GetAllMedicineRequestParentQuery {

    @ApiPropertyOptional({ enum: MedicineRequestStatus, description: 'Lọc theo trạng thái đơn gửi thuốc' })
    @IsOptional()
    @IsEnum(MedicineRequestStatus)
    status?: MedicineRequestStatus;

    @ApiPropertyOptional({ example: false, description: 'Đề xuất dừng thuốc cho học sinh', type: Boolean })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isBenefit?: boolean
}