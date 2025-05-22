import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsString } from 'class-validator';

export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    BLOCK = 'BLOCK',
}

export class ChangeAccountStatusDto {
    @ApiProperty({
        example: 1,
        description: 'ID của tài khoản cần thay đổi trạng thái',
    })
    @IsInt()
    id: number;

    @ApiProperty({
        example: 'ACTIVdsdE',
        description: 'Trạng thái mới của tài khoản',
        enum: ['ACTIVE', 'BLOCK'],
    })
    @IsString()
    @IsIn(['ACTIVE', 'BLOCK'], {
        message: 'Trạng thái mới phải là một trong các giá trị: ACTIVE, BLOCK',
    })
    newStatus: string;
}
