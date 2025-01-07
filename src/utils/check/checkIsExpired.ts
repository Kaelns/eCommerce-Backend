import { ExpiriesAfter } from '@/shared/types/types.js';
import dayjs, { ManipulateType } from 'dayjs';

export function checkIsExpired(expiresAfter: ExpiriesAfter, updatedAt: string | Date) {
  const [value, unit] = [parseInt(expiresAfter), expiresAfter.replace(/\d/gm, '') as ManipulateType];
  const nowDateWithMargin = dayjs().add(10, 'minutes');
  const expireAtDate = dayjs(updatedAt).add(value, unit);
  return expireAtDate.diff(nowDateWithMargin, 'hour', true) < 0;
}
