import { ErrorResponse } from '@commercetools/platform-sdk';
import _ from 'lodash';

export const isObject = (elem: unknown): elem is object => {
  return _.isObject(elem) && !Array.isArray(elem);
};

export const isErrorResponse = (elem: unknown): elem is ErrorResponse => {
  return isObject(elem) && 'statusCode' in elem && 'message' in elem;
};
