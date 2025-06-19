import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { TransformToInt } from "src/common/utils/transfomers";

export enum MedicineRequestStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    COMPLETED = 'COMPLETED',
    REJECTED = 'REJECTED',
}


export class GetAllMedicineRequestNurseQuery {

    @ApiPropertyOptional({ enum: MedicineRequestStatus, description: 'Lọc theo trạng thái sự kiện y tế' })
    @IsOptional()
    @IsEnum(MedicineRequestStatus)
    status?: MedicineRequestStatus;

}