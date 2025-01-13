import { ResponceOk, TokensExpiriesAfter } from '@/shared/types/types.js';

export const USER_MIN_AGE = 13;
export const USER_MAX_AGE = 100;
export const DATE_DASH_FORMAT = 'YYYY-MM-DD';

export const responceOk: ResponceOk = { ok: true };
export const responceNotOk: ResponceOk = { ok: false };

// * Commerce constants

const EXPIRATION_DAYS_ACCESS = 2; // * According to https://docs.commercetools.com/api/projects/api-clients default values
export const EXPIRATION_TIME_ACCESS_S = EXPIRATION_DAYS_ACCESS * 24 * 60 * 60;
export const EXPIRATION_TIME_ACCESS_MS = EXPIRATION_TIME_ACCESS_S * 1000;
const EXPIRATION_DAYS_REFRESH = 200; // * According to https://docs.commercetools.com/api/projects/api-clients default values
export const EXPIRATION_TIME_REFRESH_MS = EXPIRATION_DAYS_REFRESH * 24 * 60 * 60 * 1000;

export const EXPIRES_AFTER: TokensExpiriesAfter = '2d:200d';
