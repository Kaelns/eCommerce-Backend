import { ExpiriesAfter, UserTokensExpiriesAfter } from '@/shared/types/types.js';
import { checkIsExpired } from '@/utils/check/checkIsExpired.js';

interface Params {
  accessToken: string;
  refreshToken: string;
  expiresAfter: UserTokensExpiriesAfter;
  updatedAt: Date | string;
}

export function checkIsTokensExpired({ accessToken, refreshToken, expiresAfter, updatedAt }: Params) {
  const [accessDuration, refreshDuration] = expiresAfter.split(':');
  const isExpiredAccess = !accessToken || checkIsExpired(accessDuration as ExpiriesAfter, updatedAt);
  const isExpiredRefresh = !refreshToken || checkIsExpired(refreshDuration as ExpiriesAfter, updatedAt);

  return { isExpiredAccess, isExpiredRefresh };
}
