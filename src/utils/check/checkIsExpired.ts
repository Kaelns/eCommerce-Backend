import { ExpiriesAfter } from '@/shared/types/types.js';
import dayjs, { ManipulateType } from 'dayjs';

/**
 * @param {string} expiresAfter  Looks like 2d, 3h, where d - day, h- hour. See {@link ManipulateType}
 * @param {string} updatedAt  Date string
 *  */

export function checkIsExpired(expiresAfter: ExpiriesAfter, updatedAt: string | Date) {
  const [value, unit] = [parseInt(expiresAfter), expiresAfter.replace(/\d/gm, '') as ManipulateType];
  const nowDateWithMargin = dayjs().add(10, 'minutes');
  const expireAtDate = dayjs(updatedAt).add(value, unit);
  return expireAtDate.diff(nowDateWithMargin, 'hour', true) < 0;
}
