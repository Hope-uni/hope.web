import {
  ActivitySchema,
  PersonSchema,
  SinglePatientSchema,
} from '@/models/schema';
import { z } from 'zod';

export const DetailTherapistSchema = z.object({
  ...PersonSchema.shape,
  id: z.number(),
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  fullName: z.string(),
  age: z.number(),
  identificationNumber: z.string(),
  phoneNumber: z.string().optional(),
  children: z.array(SinglePatientSchema).nullable().optional(),
  activities: z.array(ActivitySchema).nullable().optional(),
});
export type DetailTherapist = z.infer<typeof DetailTherapistSchema>;
