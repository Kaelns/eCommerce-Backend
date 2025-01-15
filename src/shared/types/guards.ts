import _ from 'lodash';

export const isObject = (elem: unknown): elem is object => {
  return _.isObject(elem) && !Array.isArray(elem);
};
