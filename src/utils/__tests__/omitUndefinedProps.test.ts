import { omitUndefinedProps } from '@/utils/omitUndefinedProps.js';

describe('Given omitUndefinedProps', () => {
  it('Omits nested undefined props for arr or obj', () => {
    const obj = {
      name: 'MockName',
      age: undefined,
      collection: [1, 2, undefined, null],
      addresses: [
        { city: 'MockMinsk', address: undefined, postal: null },
        { city: 'MockMoscow', postal: null }
      ]
    };

    const resultObj = {
      name: 'MockName',
      collection: [1, 2, null],
      addresses: [
        { city: 'MockMinsk', postal: null },
        { city: 'MockMoscow', postal: null }
      ]
    };

    expect(omitUndefinedProps(obj)).toEqual(resultObj);
  });
});
