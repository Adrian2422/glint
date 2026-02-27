import { ModelResult } from '@zenstackhq/orm';
import { type SchemaType } from '../../../zenstack/schema';

export type SessionWithUserMemberships = ModelResult<
  SchemaType,
  'Session',
  { include: { user: { include: { memberships: true } } } }
>;
