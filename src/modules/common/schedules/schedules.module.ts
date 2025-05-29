import { Module } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { AcedemicYearScheduler } from './schedules.service';

@Module({
    providers: [PrismaService,AcedemicYearScheduler],
    exports: [],
})
export class ScheduledModule { }