import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { TenantInvitation } from 'zenstack/models';
import {
  TenantInvitationCreateArgs,
  TenantInvitationDeleteArgs,
  TenantInvitationFindManyArgs,
  TenantInvitationFindUniqueArgs,
  TenantInvitationUpdateArgs,
} from 'zenstack/input';

@Injectable()
export class InvitationsService {
  constructor(private readonly dbService: DbService) {}

  async findUnique(
    params: TenantInvitationFindUniqueArgs,
  ): Promise<TenantInvitation | null> {
    return this.dbService.tenantInvitation.findUnique(params);
  }

  async findMany(
    params: TenantInvitationFindManyArgs,
  ): Promise<TenantInvitation[]> {
    return this.dbService.tenantInvitation.findMany(params);
  }

  async create(params: TenantInvitationCreateArgs): Promise<TenantInvitation> {
    return this.dbService.tenantInvitation.create(params);
  }

  async update(params: TenantInvitationUpdateArgs): Promise<TenantInvitation> {
    return this.dbService.tenantInvitation.update(params);
  }

  async delete(params: TenantInvitationDeleteArgs): Promise<TenantInvitation> {
    return this.dbService.tenantInvitation.delete(params);
  }
}
