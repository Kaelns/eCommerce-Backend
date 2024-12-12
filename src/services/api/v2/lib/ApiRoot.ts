import { Client } from '@/services/api/v2/lib/Client.js';
import { ApiRootParams } from '@/services/api/v2/data/types.js';
import { isUserAuthOptions } from '@/services/api/v2/data/guards.js';
import { APIErrors, ApiRootType } from '@/services/api/v2/data/enums.js';
import { CustomTokenCache } from '@/services/api/v2/lib/CustomTokenCache.js';
import { MOCK_TOKEN_STORE } from '@/services/api/v2/data/constants.js';
import { ByProjectKeyRequestBuilder, ClientRequest, ClientResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ENV_CTS_PROJECT_KEY } from '@/shared/config/envConfig.js';

export class ApiRoot {
  private client: Client;
  private defaultApiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.client = new Client(new CustomTokenCache());
    const clientBuilder = this.client.getClientBuilder(ApiRootType.DEFAULT).build();
    this.defaultApiRoot = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({ projectKey: ENV_CTS_PROJECT_KEY });
  }

  public getDefaultApiRoot(): ByProjectKeyRequestBuilder {
    return this.defaultApiRoot;
  }

  public getApiRoot({ type = ApiRootType.TOKEN, tokenStore = MOCK_TOKEN_STORE, user }: ApiRootParams): ByProjectKeyRequestBuilder {
    if (type === ApiRootType.USER && !isUserAuthOptions(user)) {
      throw new Error(APIErrors.USER_INVALID_CREDENTIALS);
    }

    if (type === ApiRootType.TOKEN && !tokenStore?.token) {
      throw new Error(APIErrors.TOKEN_INVALID);
    }

    if (type === ApiRootType.REFRESH_TOKEN && !tokenStore?.refreshToken) {
      throw new Error(APIErrors.TOKEN_INVALID_REFRESH);
    }

    const client = this.client.getClientBuilder(type, { user, refreshToken: tokenStore?.refreshToken }).build();
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: ENV_CTS_PROJECT_KEY });
  }

  public customRequest<T>(request: ClientRequest): Promise<ClientResponse<T>> {
    const client = this.client.getClientBuilder(ApiRootType.DEFAULT).build();
    return client.execute(request);
  }
}

export const apiRoot = new ApiRoot();
