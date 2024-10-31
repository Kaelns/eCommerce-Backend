import { IParsedQs } from '@/shared/types.js';
import { IProductsQueryArgs, IProductsQueryArgsKeys } from '@/shared/zodShema.js';

export function convertReqQuery(reqQuery: IParsedQs): IProductsQueryArgs {
  const reqQueryCopy: IProductsQueryArgs = { ...reqQuery };
  (['fuzzyLevel', 'limit', 'offset'] as IProductsQueryArgsKeys[]).forEach((key) => {
    const value = reqQueryCopy[key];
    if (typeof value === 'string') {
      (reqQueryCopy[key] as string | number) = parseInt(value);
    }
  });
  (['fuzzy', 'withTotal', 'staged'] as IProductsQueryArgsKeys[]).forEach((key) => {
    const value = reqQueryCopy[key];
    if (typeof value === 'string') {
      (reqQueryCopy[key] as boolean) = value === 'true';
    }
  });
  return reqQueryCopy;
}
