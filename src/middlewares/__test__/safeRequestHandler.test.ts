import { emptyReqMock, emptyResMock } from '@/__tests__/__mocks__/express.mock.js';
import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';

describe('Given safeRequestHandler', () => {
  const next = jest.fn();

  const handler = jest.fn(() => {
    throw new Error('First handler');
  });

  const errorHandler = jest.fn(() => {
    throw new Error('Second errorHandler');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Handles error without crashing and transmits it to the next func', () => {
    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, emptyReqMock, emptyResMock, next);

    expect(requestHandler).not.toThrow();
    expect(errorHandler).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('Execute without error', () => {
    const handler = jest.fn();

    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, emptyReqMock, emptyResMock, next);

    expect(requestHandler).not.toThrow();
    expect(errorHandler).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
