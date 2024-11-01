import { IParsedQs } from '@/shared/types.js';
import { IProductsQueryArgs, IProductsQueryArgsKeys } from '@/shared/zodSchema.js';

export function convertReqQuery(reqQuery: IParsedQs): IProductsQueryArgs {
  const reqQueryCopy: IProductsQueryArgs = { ...reqQuery };
  const numberKeys: IProductsQueryArgsKeys[] = ['fuzzyLevel', 'limit', 'offset'];
  const booleanKeys: IProductsQueryArgsKeys[] = ['fuzzy', 'withTotal', 'staged'];

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
