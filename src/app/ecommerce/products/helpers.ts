import { ParsedQueryString } from '@/shared/types/types.js';
import { QueryArgsProducts, QueryArgsProductsKeys } from '@/shared/zod/product.schema.js';

export function convertProductsReqQuery(reqQuery: ParsedQueryString): QueryArgsProducts {
  const reqQueryCopy = { ...reqQuery } as QueryArgsProducts;
  const numberKeys: QueryArgsProductsKeys[] = ['fuzzyLevel', 'limit', 'offset'];
  const booleanKeys: QueryArgsProductsKeys[] = ['fuzzy', 'withTotal', 'staged'];

  numberKeys.forEach((key) => {
    const value = reqQueryCopy[key];
    if (typeof value === 'string') {
      reqQueryCopy[key] = parseInt(value);
    }
  });
  booleanKeys.forEach((key) => {
    const value = reqQueryCopy[key];
    if (typeof value === 'string') {
      reqQueryCopy[key] = value === 'true';
    }
  });
  return reqQueryCopy;
}

export function generateProductColors() {}
