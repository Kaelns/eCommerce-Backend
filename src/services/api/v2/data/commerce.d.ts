import '@commercetools/ts-client';
import '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/ts-client';
import { ClientRequest, MethodType, VariableMap } from '@commercetools/platform-sdk';

declare module '@commercetools/platform-sdk' {
  type ClientResponse<T = any> = {
    body: T;
    statusCode?: number;
    headers?: object;
    originalRequest?: ClientRequest;
    tokenStore?: TokenStore;
  };

  type MiddlewareRequest = {
    baseUri?: string;
    uri?: string;
    headers?: Record<string, any>;
    method: MethodType;
    uriTemplate?: string;
    pathVariables?: VariableMap;
    queryParams?: VariableMap;
    body?: Record<string, any> | string | Uint8Array;
    response?: ClientResponse;
    resolve?: Function;
    reject?: Function;
    [key: string]: any;
  };
}

declare module '@commercetools/ts-client' {
  type ClientResponse<T = any> = {
    body: T;
    statusCode?: number;
    headers?: object;
    originalRequest?: ClientRequest;
    tokenStore?: TokenStore;
  };

  type MiddlewareRequest = {
    baseUri?: string;
    uri?: string;
    headers?: Record<string, any>;
    method: MethodType;
    uriTemplate?: string;
    pathVariables?: VariableMap;
    queryParams?: VariableMap;
    body?: Record<string, any> | string | Uint8Array;
    response?: ClientResponse;
    resolve?: Function;
    reject?: Function;
    [key: string]: any;
  };
}
