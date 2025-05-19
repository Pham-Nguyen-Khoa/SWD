import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class UserQueryService {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string | number) {
        return this.prisma.account.findUnique({ where: { id: Number(id) } });
    }
}
