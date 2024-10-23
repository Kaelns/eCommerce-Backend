import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const LIMIT_ON_PAGE = 18;

export const projectKey = process.env.PROJECT_KEY || '';

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.API_HOST || '',
  fetch
};

export const authMiddlewareOptions = {
  host: process.env.AUTH_HOST || '',
  projectKey: process.env.PROJECT_KEY || '',
  credentials: {
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || ''
  },
  scopes: JSON.parse(process.env.SCOPES || ''),
  fetch
};

export enum APIErrors {
  USER_INVALID_TOKEN = '',
  USER_UPDATE_ERROR = 'Something went wrong during the updating process and that they should try again later.',
  EMAIL_DUPLICATE_ERROR = 'There is already an existing customer with the provided email.',
  REGISTRATION_CONNECTION_ERROR = 'Something went wrong during the registration process and that they should try again later.'
}
