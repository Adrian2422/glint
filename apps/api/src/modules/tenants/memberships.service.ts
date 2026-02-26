import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { TenantMembership } from 'zenstack/models';
import {
  TenantMembershipCreateArgs,
  TenantMembershipDeleteArgs,
  TenantMembershipFindManyArgs,
  TenantMembershipFindUniqueArgs,
  TenantMembershipUpdateArgs,
} from 'zenstack/input';

@Injectable()
export class MembershipsService {
  constructor(private readonly dbService: DbService) {}

  async findUnique(
    params: TenantMembershipFindUniqueArgs,
  ): Promise<TenantMembership | null> {
    return this.dbService.tenantMembership.findUnique(params);
  }

  async findMany(
    params: TenantMembershipFindManyArgs,
  ): Promise<TenantMembership[]> {
    return this.dbService.tenantMembership.findMany(params);
  }

  async create(params: TenantMembershipCreateArgs): Promise<TenantMembership> {
    return this.dbService.tenantMembership.create(params);
  }

  async update(params: TenantMembershipUpdateArgs): Promise<TenantMembership> {
    return this.dbService.tenantMembership.update(params);
  }

  async delete(params: TenantMembershipDeleteArgs): Promise<TenantMembership> {
    return this.dbService.tenantMembership.delete(params);
  }
}
