import { CommerceUser } from '@/database/postgres/types.js';
import { TokenStoreObj } from '@/services/api/v2/lib/TokenStore.js';
import { Selectable } from 'kysely';

export function getTokenStoreFromUser(user: Selectable<CommerceUser>) {
  return new TokenStoreObj(user.accessToken, user.refreshToken);
}
