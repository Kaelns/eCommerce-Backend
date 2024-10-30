import chalk from 'chalk';
import { RequestHandler } from 'express';

export const notFoundLogger: RequestHandler = (_, res) => {
  res.status(404).json({ message: 'Not found' });
};

export const appListenerLogger = (PORT: string) => () => {
  console.log(chalk.cyan('Listening on ') + chalk.yellowBright(PORT) + '\n');
};
