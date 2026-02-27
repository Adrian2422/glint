import { Injectable, Logger } from '@nestjs/common';
import { SystemDbService } from '../system-db/system-db.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SessionsService } from '../auth/sessions.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(private readonly systemDbService: SystemDbService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCleanupExpiredSessions() {
    this.logger.log('Starting to remove expired sessions...');

    const result = await this.systemDbService.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    this.logger.log(`${result.count} expired sessions removed.`);
  }
}
