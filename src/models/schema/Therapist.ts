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

export const PatientInTherapistSchema = z.object({
  id: z.number(),
  userId: z.number(),
  fullName: z.string(),
  age: z.number(),
});

const ListTherapistResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  fullName: z.string(),
  firstName: z.string(),
  secondName: z.string().optional().nullable(),
  surname: z.string(),
  secondSurname: z.string().optional().nullable(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.number(),
  telephone: z.string().nullable(),
  patients: z.array(PatientInTherapistSchema),
  patientsInCharge: z.number().optional(),
  image: z.string(),
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
export type ListTherapistResponse = z.infer<typeof ListTherapistResponseSchema>;
export type CreateTherapistPayload = z.infer<
  typeof CreateTherapistPayloadSchema
>;
export type CreateTherapistResponse = z.infer<
  typeof CreateTherapistResponseSchema
>;
