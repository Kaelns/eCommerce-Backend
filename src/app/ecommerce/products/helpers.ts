import { ParsedQueryString } from '@/shared/types/types.js';
import { QueryArgsProducts, QueryArgsProductsKeys } from '@/shared/zod/product.schema.js';

export function convertProductsReqQuery(reqQuery: ParsedQueryString): QueryArgsProducts {
  const reqQueryCopy: QueryArgsProducts = { ...reqQuery };
  const numberKeys: QueryArgsProductsKeys[] = ['fuzzyLevel', 'limit', 'offset'];
  const booleanKeys: QueryArgsProductsKeys[] = ['fuzzy', 'withTotal', 'staged'];

  numberKeys.forEach((key) => {
    const value = reqQueryCopy[key];
    if (typeof value === 'string') {
      (reqQueryCopy[key] as number) = parseInt(value);
    }
  });
  booleanKeys.forEach((key) => {
    const value = reqQueryCopy[key];
    if (typeof value === 'string') {
      (reqQueryCopy[key] as boolean) = value === 'true';
    }
  });
  return reqQueryCopy;
}
