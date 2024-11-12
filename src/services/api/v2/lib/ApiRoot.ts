import { Client } from '@/services/api/v2/lib/Client.js';
import { MOCK_TOKENSTORE, projectKey } from '@/services/api/v2/data/constants.js';
import { CustomTokenCache } from '@/services/api/v2/lib/CustomTokenCache.js';
import { isUserAuthOptions } from '@/services/api/v2/data/guards.js';
import { APIErrors, ApiRootType } from '@/services/api/v2/data/enums.js';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ApiRootParams } from '@/services/api/v2/data/types.js';

export class ApiRoot {
  private client: Client;
  private defaultApiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.client = new Client(new CustomTokenCache());
    const clientBuilder = this.client.getClientBuilder(ApiRootType.DEFAULT).build();
    this.defaultApiRoot = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({ projectKey });
  }

  public getDefaultApiRoot(): ByProjectKeyRequestBuilder {
    return this.defaultApiRoot;
  }

  public getApiRoot({ type = ApiRootType.TOKEN, tokenStore = MOCK_TOKENSTORE, user }: ApiRootParams): ByProjectKeyRequestBuilder {
    if (type === ApiRootType.USER && !isUserAuthOptions(user)) {
      throw new Error(APIErrors.USER_INVALID_CREDENTIALS);
    }

    if (type === ApiRootType.TOKEN && !tokenStore?.token) {
      throw new Error(APIErrors.TOKEN_INVALID);
    }

    if (type === ApiRootType.REFRESH_TOKEN && !tokenStore?.refreshToken) {
      throw new Error(APIErrors.TOKEN_INVALID_REFRESH);
    }

    const client = this.client.getClientBuilder<ApiRootType>(type, { user, refreshToken: tokenStore?.refreshToken }).build();
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
  }
}

export const apiRoot = new ApiRoot();
