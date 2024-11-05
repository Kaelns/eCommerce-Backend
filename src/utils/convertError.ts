import { isErrorResponse, isObject } from '@/shared/guards.js';
import { ErrorResponse } from '@commercetools/platform-sdk';

export function convertError(error: unknown): Error | ErrorResponse | null {
  if (error instanceof Error) {
    if (isObject(error) && 'body' in error && isErrorResponse(error.body)) {
      console.log(error.body);
      return error.body;
    }
    error.stack = process.env.NODE_ENV === 'production' ? 'Not development' : error.stack;
    return error;
  }
  return null;
}
