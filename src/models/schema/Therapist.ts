import { z } from 'zod';
import {
  CreateUserPayloadSchema,
  PersonSchema,
  UserSchema,
} from '@/models/schema';

export const TherapistSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  patientsInCharge: z.number(),
  user: UserSchema,
});

export const CreateTherapistPayloadSchema = CreateUserPayloadSchema.merge(
  PersonSchema,
).extend({
  identificationNumber: z.string(),
  phoneNumber: z.string(),
  telephone: z.string(),
});

export const CreateTherapistResponseSchema = z.any();

export type Therapist = z.infer<typeof TherapistSchema>;
export type CreateTherapistPayload = z.infer<
  typeof CreateTherapistPayloadSchema
>;
export type CreateTherapistResponse = z.infer<
  typeof CreateTherapistResponseSchema
>;
