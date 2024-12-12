import { checkIsExpired } from '@/utils/checkIsExpired.js';
import dayjs from 'dayjs';

const expiresAfter = '2d';

describe('Given checkIsExpired', () => {
  test('return true if the date is not expired', () => {
    const updatedAt = dayjs().subtract(1, 'd').format();
    expect(checkIsExpired(expiresAfter, updatedAt)).toBeTruthy();
  });

  test('return false if the date is expired', () => {
    const updatedAt = dayjs().subtract(2.5, 'd').format();
    expect(checkIsExpired(expiresAfter, updatedAt)).toBeFalsy();
  });
});
