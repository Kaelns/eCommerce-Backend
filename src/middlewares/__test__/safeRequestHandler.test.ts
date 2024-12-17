import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';
import { Request, Response } from 'express';

const next = jest.fn();

const handler = () => {
  throw new Error('First handler');
};

const errorHandler = () => {
  throw new Error('Second errorHandler');
};

describe('Given safeRequestHandler', () => {
  test('handles functions without error and transmits an error to the next func', () => {
    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, {} as Request, {} as Response, next);

    expect(requestHandler).not.toThrow();
    expect(next).toHaveBeenCalled();
  });
});
