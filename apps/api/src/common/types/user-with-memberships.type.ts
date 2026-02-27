import { ModelResult } from '@zenstackhq/orm';
import { type SchemaType } from '../../../zenstack/schema';

export type UserWithMemberships = ModelResult<
  SchemaType,
  'User',
  { include: { memberships: true }; omit: { password: false } }
>;
