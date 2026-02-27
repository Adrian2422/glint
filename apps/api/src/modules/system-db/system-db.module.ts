import { Global, Module } from '@nestjs/common';
import { SystemDbService } from './system-db.service';

@Global()
@Module({
  providers: [SystemDbService],
  exports: [SystemDbService],
})
export class SystemDbModule {}
