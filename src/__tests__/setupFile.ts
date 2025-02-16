import * as dotenv from 'dotenv';

jest.mock('chalk', () => ({
  red: jest.fn(),
  cyan: jest.fn(),
  green: jest.fn(),
  bgRed: jest.fn(),
  yellow: jest.fn(),
  magenta: jest.fn(),
  bgGrey: jest.fn(),
  bgGreen: jest.fn(),
  bgBlueBright: jest.fn()
}));

dotenv.config({ path: '.env.test.local' });
