import { z } from 'zod';
import postalRegex from '@/shared/json/postalRegex.json';
import isoCountryEnum from '@/shared/json/isoCountryEnum.json';

const apartmentSchema = z.string().regex(/^[A-Za-z0-9-/]+$/gm, 'The apartment number can contain latins letters, numbers, dash and slash');
const streetNumberSchema = z.string().regex(/^[A-Za-z0-9-/]+$/gm, 'The street number can contain latins letters, numbers, dash and slash');
export const dateOfBirthSchema = z.coerce.date().transform((data) => data.toISOString());

const countrySchema = z
  .string()
  .min(2)
  .regex(/^[A-Za-z-]+$/gm, 'The country can contain latins letters and dash');

const citySchema = z
  .string()
  .min(2)
  .regex(/^[A-Za-z0-9- ]+$/gm, 'The city can contain latins letters, numbers, whitespace and dash');

const streetNameSchema = z
  .string()
  .min(2)
  .regex(/^[A-Za-z0-9- ]+$/gm, 'The street name can contain latins letters, numbers, whitespace and dash');

export const nameSchema = z
  .string()
  .trim()
  .regex(/^[a-zA-Z ]+$/gm, 'The first/last names must contain only letters');

export const emailSchema = z
  .string()
  .email()
  .regex(/@[a-zA-Z0-9]{2,}\.[A-Za-z]{2,}$/gm, 'Invalid domain part');

export const passwordSchema = z
  .string()
  .min(8, 'The password must be at least 8 characters long')
  .max(32, 'The password must be a maximun 32 characters')
  .regex(/[A-Z]+/gm, 'The password must contain at least one uppercase character')
  .regex(/[0-9]+/gm, 'The password must contain at least one digit')
  .regex(/^[A-Za-z0-9#?!@$%^&*-]+$/gm, 'Only latin letters, numbers and # ? ! @ $ % ^ & * - are allowed')
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z0-9#?!@$%^&*-]*$/gm, 'Password is not valid');

// TODO Country keys for validation and create select menu  on the frontend
export const addressSchema = z
  .object({
    country: countrySchema,
    city: citySchema,
    streetName: streetNameSchema,
    streetNumber: streetNumberSchema,
    apartment: apartmentSchema.optional(),
    postalCode: z.string()
  })
  .superRefine(({ country, postalCode }, ctx) => {
    if (!(country in isoCountryEnum)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `There is no such country in our list like "${country}"`
      });
    }

    const isoCountry = isoCountryEnum[country as keyof typeof isoCountryEnum];
    const countryPostalRegex = new RegExp(postalRegex[isoCountry as keyof typeof postalRegex].postalRegex);

    if (!countryPostalRegex.test(postalCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `The postal code "${postalCode}" is invalid for "${country}"`
      });
    }
  });
