import { Injectable, Scope, Inject } from '@nestjs/common';
import { ZenStackClient } from '@zenstackhq/orm';
import { PostgresDialect } from '@zenstackhq/orm/dialects/postgres';
import { Pool } from 'pg';
import { REQUEST } from '@nestjs/core';
import { User } from '../../../zenstack/models';
import { type AuthResponse } from '../auth/interfaces/auth-provider.interface';
import { schema, type SchemaType } from '../../../zenstack/schema';

@Injectable({ scope: Scope.REQUEST })
export class DbService extends ZenStackClient<SchemaType> {
  constructor(@Inject(REQUEST) private request: AuthResponse) {
    const connectionString = process.env.DATABASE_URL;
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString,
      }),
    });

    const user = request.user as User;

    super(schema, {
      dialect,
    });

    this.$setAuth(user);
  }
}
