import { queryArgsCardVersionSchema } from '@/shared/zod/cart.schema.js';

describe('Given queryArgsCardVersionSchema zod schema', () => {
  test('pass valid data', () => {
    const elems = [{ version: '4' }, { version: '1234' }, { version: '123.64' }, { version: '1238msd' }];
    const isAllInvalid = elems.map((elem) => queryArgsCardVersionSchema.safeParse(elem).success).every((val) => val);
    expect(isAllInvalid).toBeTruthy();
  });

  test('fall invalid data', () => {
    const elems = [{ version: 4 }, { version: true }, { version: { same: 4 } }, { version: [4] }, { version: NaN }];
    const isAllInvalid = elems.map((elem) => queryArgsCardVersionSchema.safeParse(elem).success).every((val) => !val);
    expect(isAllInvalid).toBeTruthy();
  });
});
