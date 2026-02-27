import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { schema, SchemaType } from '../../../zenstack/schema';
import { PostgresDialect } from '@zenstackhq/orm/dialects/postgres';
import { ZenStackClient } from '@zenstackhq/orm';

@Injectable()
export class SystemDbService extends ZenStackClient<SchemaType> {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    const dialect = new PostgresDialect({
      pool: new Pool({ connectionString }),
    });

    super(schema, { dialect });
  }
}
