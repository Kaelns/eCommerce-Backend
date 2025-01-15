import { Response } from 'express';
import chalk from 'chalk';

export function convertError(error: unknown, res?: Response): Error | null {
  if (!(error instanceof Error)) {
    return null;
  }

  if (res && 'status' in error && typeof error.status === 'number') {
    res.status(error.status);
  }

  console.log(chalk.bgRed(' Error '), '\n', error);

  return {
    name: error.name,
    message: error.message
  };
}
