import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export enum MedicalEventStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    HOSPITALIZED = 'HOSPITALIZED',
    HOSPITALDISCHARGE = 'HOSPITALDISCHARGE',
    COMPLETED = 'COMPLETED',
}


export class GetAllMedicalEventManagerQuery {

    @ApiPropertyOptional({ enum: MedicalEventStatus, description: 'Lọc theo trạng thái sự kiện y tế' })
    @IsOptional()
    @IsEnum(MedicalEventStatus)
    status?: MedicalEventStatus;
}