import { bodyUserCredentialsSchema } from '@/shared/zod/user.schema.js';

const elem = {
  firstName: 'Mock',
  lastName: 'Mockovski',
  email: 'mock@live.com',
  password: 'Caramba228',
  dateOfBirth: '2000/03/23',
  addresses: [
    {
      country: 'BY',
      city: 'Mock',
      streetName: 'Mockovskaja',
      streetNumber: '1',
      apartment: '1',
      postalCode: '228228'
    }
  ],
  shippingAddresses: [1]
};

describe('Given bodyUserCredentialsSchema zod schema', () => {
  test('pass valid data', () => {
    expect(bodyUserCredentialsSchema.safeParse(elem).success).toBeTruthy();
  });
});
