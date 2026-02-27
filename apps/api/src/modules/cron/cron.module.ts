import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { SystemDbService } from '../system-db/system-db.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService, SystemDbService],
  exports: [CronService],
})
export class CronModule {}
