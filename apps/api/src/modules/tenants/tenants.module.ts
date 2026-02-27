import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { MembershipsService } from './memberships.service';
import { InvitationsService } from './invitations.service';
import { TenantsController } from './tenants.controller';

@Module({
  providers: [TenantsService, MembershipsService, InvitationsService],
  controllers: [TenantsController],
  exports: [TenantsService, MembershipsService, InvitationsService],
})
export class TenantsModule {}
