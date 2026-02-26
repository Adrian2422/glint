import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { MembershipsService } from './memberships.service';
import { InvitationsService } from './invitations.service';
import { Tenant, TenantMembership, TenantInvitation } from 'zenstack/models';
import {
  TenantCreateArgs,
  TenantInvitationCreateArgs,
} from '../../../zenstack/input';

@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly membershipsService: MembershipsService,
    private readonly invitationsService: InvitationsService,
  ) {}

  @Get()
  async findAll(): Promise<Tenant[]> {
    return this.tenantsService.findMany({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tenant | null> {
    return this.tenantsService.findUnique({ where: { id } });
  }

  @Post()
  async create(@Body() data: TenantCreateArgs['data']): Promise<Tenant> {
    return this.tenantsService.create({ data });
  }

  @Get(':id/memberships')
  async getMemberships(@Param('id') id: string): Promise<TenantMembership[]> {
    return this.membershipsService.findMany({ where: { tenantId: id } });
  }

  @Post(':id/invitations')
  async invite(
    @Param('id') id: string,
    @Body() data: TenantInvitationCreateArgs['data'],
  ): Promise<TenantInvitation> {
    return this.invitationsService.create({ data: { ...data, tenantId: id } });
  }
}
