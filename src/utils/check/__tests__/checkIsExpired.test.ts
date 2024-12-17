import { checkIsExpired } from '@/utils/check/checkIsExpired.js';
import dayjs from 'dayjs';

const expiresAfter = '2d';

describe('Given checkIsExpired', () => {
  test('return false if the date is not expired', () => {
    const updatedAt = dayjs().subtract(1, 'day').format();
    const updatedAt2 = dayjs().subtract(1, 'day').subtract(12, 'hour').format();
    expect(checkIsExpired(expiresAfter, updatedAt)).toBeFalsy();
    expect(checkIsExpired(expiresAfter, updatedAt2)).toBeFalsy();
  });

  test('return true if the date is expired', () => {
    const updatedAt = dayjs().subtract(2, 'd').subtract(12, 'hour').format();
    const updatedAt2 = dayjs().subtract(5, 'd').format();
    expect(checkIsExpired(expiresAfter, updatedAt)).toBeTruthy();
    expect(checkIsExpired(expiresAfter, updatedAt2)).toBeTruthy();
  });

  test('return true at the boundary value with the expectation of a 10-minute margin', () => {
    const updatedAt = dayjs().subtract(2, 'd').format();
    expect(checkIsExpired(expiresAfter, updatedAt)).toBeTruthy();
  });
});
