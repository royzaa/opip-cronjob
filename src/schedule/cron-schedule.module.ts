import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronSchedueService } from './cron-schedue.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [CronSchedueService],
})
export class CronScheduleModule {
}