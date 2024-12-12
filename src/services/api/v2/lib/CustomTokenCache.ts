import { MOCK_TOKEN_STORE } from '@/services/api/v2/data/constants.js';
import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class CustomTokenCache implements TokenCache {
  private tokenStore: TokenStore;

  constructor() {
    this.tokenStore = MOCK_TOKEN_STORE;
  }

  get(): Readonly<TokenStore> {
    return this.tokenStore;
  }

  set(cache: TokenStore): void {
    this.tokenStore.token = cache.token;
    this.tokenStore.expirationTime = cache.expirationTime;
    this.tokenStore.refreshToken = cache.refreshToken;
  }

  reset(): void {
    this.tokenStore.token = '';
    this.tokenStore.refreshToken = '';
    this.tokenStore.expirationTime = 0;
  }
}
