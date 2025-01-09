import { Client } from '@/services/api/v2/lib/Client.js';
import { ApiRootType } from '@/services/api/v2/data/enums.js';
import { TokenStoreObj } from '@/services/api/v2/lib/TokenStore.js';
import { CustomTokenCache } from '@/services/api/v2/lib/CustomTokenCache.js';
import { ClientBuilder, UserAuthOptions } from '@commercetools/ts-client';

describe('Ecommerce Client class', () => {
  const tokenStore = new TokenStoreObj('access token', 'refresh token');
  const tokenCache = new CustomTokenCache();
  const client = new Client(tokenCache);

  const setTokenCacheSpy = jest.spyOn(tokenCache, 'set');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('get default Client', () => {
    const defaultClient = jest.spyOn(ClientBuilder.prototype, 'withClientCredentialsFlow');
    client.getClientBuilder({ type: ApiRootType.DEFAULT });
    expect(defaultClient).toHaveBeenCalled();
  });

  it('get Client without tokenStore', () => {
    client.getClientBuilder({ type: ApiRootType.DEFAULT });
    expect(setTokenCacheSpy).not.toHaveBeenCalled();
  });

  it('get Client with tokenStore', () => {
    client.getClientBuilder({ type: ApiRootType.DEFAULT, tokenStore });
    expect(setTokenCacheSpy).toHaveBeenCalled();
  });

  it('get anonymous Client', () => {
    const anonymousClient = jest.spyOn(ClientBuilder.prototype, 'withAnonymousSessionFlow');
    client.getClientBuilder({ type: ApiRootType.ANONYM });
    expect(anonymousClient).toHaveBeenCalled();
  });

  it('get password Client', () => {
    const passwordClient = jest.spyOn(ClientBuilder.prototype, 'withPasswordFlow');

    const userAuthOptions: UserAuthOptions = { username: 'Mock', password: 'Mock228' };

    client.getClientBuilder({ type: ApiRootType.USER, tokenStore, user: userAuthOptions });

    const userAuthOptionsArgument = passwordClient.mock.calls[0][0];
    const { username, password } = userAuthOptionsArgument.credentials.user;
    const isUserAuthInOptions = username === userAuthOptions.username && password === userAuthOptions.password;

    const { token, refreshToken } = userAuthOptionsArgument.tokenCache!.get();
    const isTokensInOptions = token === tokenStore.token && refreshToken === tokenStore.refreshToken;

    expect(isUserAuthInOptions).toBeTruthy();
    expect(isTokensInOptions).toBeTruthy();
    expect(ClientBuilder.prototype.withPasswordFlow).toHaveBeenCalled();
  });

  it('get tokens Client', () => {
    const tokensClient = jest.spyOn(ClientBuilder.prototype, 'withExistingTokenFlow');

    client.getClientBuilder({ type: ApiRootType.TOKEN, tokenStore });

    const authorizationBearerStr = tokensClient.mock.calls[0][0];
    const isTokenInOptions = authorizationBearerStr.includes(tokenStore.token);

    expect(isTokenInOptions).toBeTruthy();
    expect(tokensClient).toHaveBeenCalled();
  });

  it('get refresh token Client', () => {
    const refreshClient = jest.spyOn(ClientBuilder.prototype, 'withRefreshTokenFlow');
    client.getClientBuilder({ type: ApiRootType.REFRESH_TOKEN, tokenStore });

    const { refreshToken } = refreshClient.mock.calls[0][0];
    const isRefreshTokenInOptions = refreshToken === tokenStore.refreshToken;

    expect(refreshClient).toHaveBeenCalled();
    expect(isRefreshTokenInOptions).toBeTruthy();
  });
});
