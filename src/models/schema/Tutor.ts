import {
  PersonSchema,
  SinglePatientSchema,
  SingleTutorTherapistSchema,
} from '@/models/schema';
import { z } from 'zod';

export const DetailTutorSchema = z.object({
  ...PersonSchema.shape,
  id: z.number(),
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  fullName: z.string(),
  age: z.number(),
  identificationNumber: z.string(),
  phoneNumber: z.string().optional(),
  telephone: z.string().optional(),
  children: z.array(SinglePatientSchema),
});
export type DetailTutor = z.infer<typeof DetailTutorSchema>;
