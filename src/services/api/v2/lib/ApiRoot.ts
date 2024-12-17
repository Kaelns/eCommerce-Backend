import { Client } from '@/services/api/v2/lib/Client.js';
import { CustomTokenCache } from '@/services/api/v2/lib/CustomTokenCache.js';
import { MOCK_TOKEN_STORE } from '@/services/api/v2/data/constants.js';
import { isUserAuthOptions } from '@/services/api/v2/data/guards.js';
import { ENV_CTS_PROJECT_KEY } from '@/shared/config/envConfig.js';
import { APIErrors, ApiRootType } from '@/services/api/v2/data/enums.js';
import { ApiRootParams, ClientParams } from '@/services/api/v2/data/types.js';
import { ByProjectKeyRequestBuilder, ClientRequest, ClientResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export class ApiRoot {
  private client: Client;
  private defaultApiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.client = new Client(new CustomTokenCache());
    const clientBuilder = this.client.getClientBuilder({ type: ApiRootType.DEFAULT }).build();
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

    const client = this.client.getClientBuilder({ type, tokenStore, user } as ClientParams).build();
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: ENV_CTS_PROJECT_KEY });
  }

  public customClientRequest<T>(clientParams: ClientParams, request: ClientRequest): Promise<ClientResponse<T>> {
    return this.client.getClientBuilder(clientParams).build().execute(request);
  }
}

export const apiRoot = new ApiRoot();
