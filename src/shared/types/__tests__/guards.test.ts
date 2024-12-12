import { NoUndefinedField } from '@/shared/types/guards.js';

const testObject = {
  name: 'Igor',
  age: 25
}

describe('Given isNonNullableObject type guard', () => {
  test('return true on non undefined props', () => {
    expect(NoUndefinedField(testObject)).toBeTruthy();
  });

  test('return false on undefined props', () => {
    const nullableObj = {
      ...testObject,
      city: undefined
    };
    expect(NoUndefinedField(testObject)).toBeFalsy();
  });

  test('works with nested objects', () => {
    const testObject = {
      name: 'Igor',
      age: 25,
      someInfo:  {
        isMarried: true,
        address: undefined
      }
    };
    expect(NoUndefinedField(testObject)).toBeFalsy();
  });
});
