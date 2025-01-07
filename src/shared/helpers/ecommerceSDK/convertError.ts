import { isErrorResponse } from '@/shared/types/guards.js';
import { ErrorResponse } from '@commercetools/platform-sdk';
import chalk from 'chalk';

export function convertError(error: unknown): Error | ErrorResponse | null {
  if (error instanceof Error) {
    if ('body' in error && isErrorResponse(error.body)) {
      console.log(chalk.bgRed('Commerce Error'), '\n', error.body);
      return error.body;
    }
    error.stack = process.env.NODE_ENV === 'production' ? 'Not development' : error.stack;
    return error;
  }
  return null;
}
