import chalk from 'chalk';
import morgan from 'morgan';

export const morganChalk = morgan(function (tokens, req, res) {
  const statusCode = +(tokens.status(req, res) ?? 0);
  const isOk = statusCode >= 200 && statusCode <= 300;

  const message = [
    '\n',
    chalk.bgBlue(` ${tokens.method(req, res)} `),
    isOk ? chalk.bgGreen(` ${statusCode} `) : chalk.bgRed(` ${statusCode} `),
    chalk.gray(tokens.url(req, res)),
    chalk.green(tokens['response-time'](req, res) + 'ms'),
    chalk.gray(`from ${tokens.referrer(req, res) ?? '{Not found}'}`),
    chalk.blue(tokens['user-agent'](req, res)),
    '\n'
  ].join(' ');

  const dividingLine = isOk ? chalk.blue('-'.repeat(message.length / 1.7)) : chalk.red('-'.repeat(message.length / 1.7));

  return message + dividingLine;
});
