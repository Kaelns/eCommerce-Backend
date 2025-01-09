import { Request } from 'express';
import { Selectable } from 'kysely';
import { CommerceUser } from '@/database/postgres/types.js';

export interface AuthenticatedRequest extends Request {
  user: Selectable<CommerceUser>;
}
