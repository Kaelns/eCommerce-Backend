import { Selectable } from 'kysely';
import { CommerceUser } from '@/database/postgres/types.ts';

declare global {
  namespace Express {
    interface User extends Selectable<CommerceUser> {}
  }
}
