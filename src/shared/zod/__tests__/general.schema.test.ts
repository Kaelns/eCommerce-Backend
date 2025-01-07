import { dateOfBirthSchema, passwordSchema } from '@/shared/zod/general.schema.js';

describe('dateOfBirthSchema zod schema', () => {
  const date = '2000-03-23';
  const dates = [date, '2000/03/23', new Date(date).toDateString(), new Date(date).toString(), new Date(date).toUTCString()];
  const parsedDates = dates.map((el) => dateOfBirthSchema.safeParse(el));

  it('pass on valid datelike string and transformed to unified format', () => {
    const isParsed = parsedDates.every((el) => el.success);
    expect(isParsed).toBeTruthy();
  });

  it('transform datelike strings to unified format', () => {
    const isTransformed = parsedDates.every((el) => el.data === date);
    expect(isTransformed).toBeTruthy();
  });

  it('fall on invalid date string', () => {
    const invalidDate = '2Yuck000/03/23';
    const parsedDate = dateOfBirthSchema.safeParse(invalidDate);
    expect(parsedDate.success).toBeFalsy();
  });
});

describe('passwordSchema zod schema', () => {
  it('fall on 8 min chars', () => {
    const invalidPassword = '8min';
    const errorMessage = 'The password must be at least 8 characters long';

    const parsedZod = passwordSchema.safeParse(invalidPassword);
    const is8MinCharsError = parsedZod.error?.errors.some((errorObj) => errorObj.message === errorMessage);

    expect(parsedZod.success).toBeFalsy();
    expect(is8MinCharsError).toBeTruthy();
  });

  it('fall on 32 max chars', () => {
    const invalidPassword = '32maxStart12312312312312312312312312312312312312312312312312312312312312312312312312312313';
    const errorMessage = 'The password must be a maximum 32 characters';

    const parsedZod = passwordSchema.safeParse(invalidPassword);
    const is8MinCharsError = parsedZod.error?.errors.some((errorObj) => errorObj.message === errorMessage);

    expect(parsedZod.success).toBeFalsy();
    expect(is8MinCharsError).toBeTruthy();
  });

  it('pass on valid password with at least 1 uppercase latin and 1 digit', () => {
    const validPassword = 'Caramba228';

    expect(passwordSchema.safeParse(validPassword).success).toBeTruthy();
    expect(passwordSchema.safeParse('Caramba2').success).toBeTruthy();
    expect(passwordSchema.safeParse('ABCaramba228').success).toBeTruthy();
    expect(passwordSchema.safeParse('ABCaramba228#?!@$%^&*-').success).toBeTruthy();

    expect(passwordSchema.safeParse('caramba2').success).toBeFalsy();
    expect(passwordSchema.safeParse('Caramba').success).toBeFalsy();
    expect(passwordSchema.safeParse(`    ${validPassword}    with whitespaces`).success).toBeFalsy();
    expect(passwordSchema.safeParse(`${validPassword}WithРусский`).success).toBeFalsy();
    expect(passwordSchema.safeParse(`${validPassword}WithForbidden<>(){}[]`).success).toBeFalsy();
  });

  it('pass on special # ? ! @ $ % ^ & * - / chars', () => {
    const validPassword = 'Caramba228#?!@$%^&*-/';
    const parsedZod = passwordSchema.safeParse(validPassword);
    expect(parsedZod.success).toBeTruthy();
  });
});
