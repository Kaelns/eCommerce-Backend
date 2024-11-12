import { z } from 'zod';
import { DATE_DASH_FORMAT } from '@/shared/data/constants.js';
import dayjs from 'dayjs';
import isoPostalRegex from '@/shared/json/postalRegex.json';
import isoCountryList from '@/shared/json/ISO3166-countries.json';

const apartmentSchema = z.string().regex(/^[A-Za-z0-9-/]+$/gm, 'The apartment number can contain latins letters, numbers, dash and slash');
const streetNumberSchema = z.string().regex(/^[A-Za-z0-9-/]+$/gm, 'The street number can contain latins letters, numbers, dash and slash');

export const dateOfBirthSchema = z
  .string()
  .refine((data) => dayjs(data).isValid(), 'Invalid date')
  .transform((date) => dayjs(date).format(DATE_DASH_FORMAT));

const countrySchema = z
  .string()
  .min(2)
  .regex(/^[A-Z]{2}$/gm, 'The country must meet the uppercase ISO 3166 format');

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
  .max(32, 'The password must be a maximum 32 characters')
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
    if (!(country in isoCountryList) && !(country in isoPostalRegex)) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `There is no such country like "${country}"`
      });
    }

    const countryPostalRegex = new RegExp(isoPostalRegex[country as keyof typeof isoPostalRegex].postalRegex);

    if (!countryPostalRegex.test(postalCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `The postal code "${postalCode}" is invalid for "${country}"`
      });
    }
  });
