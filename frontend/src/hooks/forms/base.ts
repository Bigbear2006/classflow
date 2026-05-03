import { z } from 'zod';

export const requiredInt = () =>
  z.preprocess((val: string) => (val !== '' ? +val : undefined), z.coerce.number<string>().int());

export const optionalInt = () =>
  z.preprocess(
    (val: string) => (val !== '' ? +val : undefined),
    z.coerce.number<string>().int().optional(),
  );
