import { emptyReqMock, emptyResMock } from '@/__tests__/__mocks__/express.mock.js';
import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';
import { BackendError } from '@/shared/helpers/ecommerceSDK/BackendError.js';

describe('Given safeRequestHandler', () => {
  const next = jest.fn();

  const handler = jest.fn(() => {
    throw new BackendError('First handler');
  });

  const errorHandler = jest.fn(() => {
    throw new BackendError('Second errorHandler');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Handles error without crashing and transmits it to the next func', async () => {
    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, emptyReqMock, emptyResMock, next);

    await expect(requestHandler()).resolves.not.toThrow();
    expect(errorHandler).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(BackendError));
  });

  it('Execute without error', async () => {
    const handler = jest.fn();

    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, emptyReqMock, emptyResMock, next);

    await expect(requestHandler()).resolves.not.toThrow();
    expect(errorHandler).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('errorHandler successfully handles error and calls handler again each new time', async () => {
    let firstCall = true;
    const handler = jest.fn(async () => {
      if (firstCall) {
        firstCall = false;
        throw new BackendError('First call error');
      }
    });

    const errorHandler = jest.fn(async () => {
      return handler();
    });

    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, emptyReqMock, emptyResMock, next);

    await expect(requestHandler()).resolves.not.toThrow();
    expect(handler).toHaveBeenCalledTimes(2);
    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();
  });

  it('counter on errorHandler resets each time on new fetch', async () => {
    let firstCall = true;
    const handler = jest.fn(async () => {
      if (firstCall) {
        firstCall = false;
        throw new BackendError('First call error');
      }
    });

    const errorHandler = jest.fn(async () => {
      return handler();
    });

    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, emptyReqMock, emptyResMock, next);

    for (let i = 0; i < 5; i++) {
      firstCall = true;
      handler.mockClear();
      errorHandler.mockClear();

      await requestHandler();

      expect(handler).toHaveBeenCalledTimes(2);
      expect(errorHandler).toHaveBeenCalledTimes(1);
    }
  });

  it('errorHandler is called only once', async () => {
    const errorHandler = jest.fn(async () => {
      return handler();
    });

    const requestHandler = safeRequestHandler(handler, errorHandler).bind(this, emptyReqMock, emptyResMock, next);

    await expect(requestHandler()).resolves.not.toThrow();
    expect(handler).toHaveBeenCalledTimes(2);
    expect(errorHandler).toHaveBeenCalledTimes(1);
  });
});
