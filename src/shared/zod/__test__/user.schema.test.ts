import { bodyUserCredentialsSchema } from '@/shared/zod/user.schema.js';

const elem = {
  firstName: 'Yura',
  lastName: 'Ahanouski',
  email: 'whoWhe@live.com',
  password: 'Caramba228',
  dateOfBirth: '2000/03/23',
  addresses: [
    {
      country: 'Belarus',
      city: 'Minsk',
      streetName: 'Nijegorodskaia',
      streetNumber: '1',
      apartment: '42',
      postalCode: '228228'
    }
  ],
  shippingAddresses: [1]
};

describe('Given bodyUserCredentialsSchema zod schema', () => {
  test('truthfully parse valid data', () => {
    expect(bodyUserCredentialsSchema.safeParse(elem).success).toBeTruthy();
  });
});
