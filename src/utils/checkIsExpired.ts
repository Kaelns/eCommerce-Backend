import dayjs, { ManipulateType } from 'dayjs';

export function checkIsExpired(expiresAfter: string, updatedAt: string) {
  const [value, unit] = [parseInt(expiresAfter), expiresAfter.replace(/\d/gm, '') as ManipulateType];
  const now = dayjs();
  const expireAt = dayjs(updatedAt).add(value, unit);
  return expireAt.diff(now, 'hour', true) > 0;
}
