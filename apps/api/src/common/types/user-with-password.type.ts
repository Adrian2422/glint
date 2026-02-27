import { ModelResult } from '@zenstackhq/orm';
import type { SchemaType } from '../../../zenstack/schema';

export type UserWithPassword = ModelResult<
  SchemaType,
  'User',
  { omit: { password: false } }
>;
