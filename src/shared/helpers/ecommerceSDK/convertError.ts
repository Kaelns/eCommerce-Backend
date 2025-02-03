import { Response } from 'express';
import chalk from 'chalk';
import { BackendError } from '@/shared/helpers/ecommerceSDK/BackendError.js';

export function convertError(error: unknown, res?: Response): BackendError | null {
  if (!(error instanceof Error)) {
    return null;
  }

  if (res && 'status' in error && typeof error.status === 'number') {
    res.status(error.status);
  }

  console.log(chalk.bgRed(' Error '), '\n', error);

  return new BackendError(error.message, res!.statusCode, error.name);
}
