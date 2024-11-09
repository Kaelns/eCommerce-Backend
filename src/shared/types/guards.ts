import { ErrorResponse } from '@commercetools/platform-sdk';

export const isObject = (elem: unknown): elem is object => {
  return typeof elem === 'object' && elem !== null && !Array.isArray(elem);
};

export const isErrorResponse = (elem: unknown): elem is ErrorResponse => {
  return isObject(elem) && 'statusCode' in elem && 'message' in elem;
};
