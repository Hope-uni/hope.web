import { z } from 'zod';

export const PersonSchema = z.object({
  firstName: z.string(),
  secondName: z.string().optional().nullable(),
  surname: z.string(),
  secondSurname: z.string().optional().nullable(),
  image: z.string().nullable(),
  address: z.string(),
  birthday: z.string(),
  gender: z.enum(['Masculino', 'Femenino', 'masculino', 'femenino']),
});
