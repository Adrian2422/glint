import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Tenant } from 'zenstack/models';
import {
  TenantCreateArgs,
  TenantDeleteArgs,
  TenantFindManyArgs,
  TenantFindUniqueArgs,
  TenantUpdateArgs,
} from 'zenstack/input';

@Injectable()
export class TenantsService {
  constructor(private readonly dbService: DbService) {}

  async findUnique(params: TenantFindUniqueArgs): Promise<Tenant | null> {
    return this.dbService.tenant.findUnique(params);
  }

  async findMany(params: TenantFindManyArgs): Promise<Tenant[]> {
    return this.dbService.tenant.findMany(params);
  }

  async create(params: TenantCreateArgs): Promise<Tenant> {
    return this.dbService.tenant.create(params);
  }

  async update(params: TenantUpdateArgs): Promise<Tenant> {
    return this.dbService.tenant.update(params);
  }

  async delete(params: TenantDeleteArgs): Promise<Tenant> {
    return this.dbService.tenant.delete(params);
  }
}
