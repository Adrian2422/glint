import { Injectable } from '@nestjs/common';
import { ZenStackClient } from '@zenstackhq/orm';
import { schema, type SchemaType } from '../zenstack/schema';
import { PostgresDialect } from '@zenstackhq/orm/dialects/postgres';
import { Pool } from 'pg';

@Injectable()
export class DbService extends ZenStackClient<SchemaType> {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString,
      }),
    });

    super(schema, { dialect });
  }
}
