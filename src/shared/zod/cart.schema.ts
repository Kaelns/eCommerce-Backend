import { z } from 'zod';

export const queryArgsCardVersionSchema = z.object({
  version: z.string().refine((arg) => Number.isInteger(parseInt(arg)), 'The "version" parameter must be a string that can be converted to a number')
});
