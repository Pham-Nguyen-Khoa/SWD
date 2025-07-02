import {
    IsInt,
    IsString,
    IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';




export class HealthCheckupMeetingRequestDto {
    @ApiProperty({ example: 1, description: 'ID của cuộc khám sức khỏe định kỳ' })
    @IsInt()
    healthCheckUpID: number;

    @ApiProperty({ example: 1, description: 'ID của học sinh' })
    @IsInt()
    studentID: number;


    @ApiProperty({ example: '2025-06-30T14:00:00', description: 'Lịch hẹn' })
    @IsDateString()
    scheduledAt: string;

    @ApiProperty({
        example: 'Cảm thấy sức khỏe của bé không phù hợp với tuổi',
        description: 'Lý do',
        required: true,
    })
    @IsString()
    reason: string;

}

