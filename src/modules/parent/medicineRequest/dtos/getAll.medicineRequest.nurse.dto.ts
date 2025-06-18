import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

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
}