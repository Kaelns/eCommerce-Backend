import { TokenStore } from '@commercetools/ts-client';
import { EXPIRATION_TIME_MS } from '@/shared/data/constants.js';

export class TokenStoreObj implements TokenStore {
  constructor(public token = '', public refreshToken = '', public expirationTime = EXPIRATION_TIME_MS) {}
}
