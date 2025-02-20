import { z } from 'zod';
import {
  ActivitySchema,
  CreateUserPayloadSchema,
  ListPatientResponseSchema,
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
export type Therapist = z.infer<typeof TherapistSchema>;

export const ListTherapistResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  image: z.string().nullable(),
  fullName: z.string(),
  email: z.string(),
  username: z.string(),
  phoneNumber: z.string().optional(),
  childrenInCharge: z.number().optional(),
});
export type ListTherapistResponse = z.infer<typeof ListTherapistResponseSchema>;

export const CreateTherapistPayloadSchema = CreateUserPayloadSchema.merge(
  PersonSchema,
).extend({
  identificationNumber: z.string(),
  phoneNumber: z.string(),
  telephone: z.string(),
});
export type CreateTherapistPayload = z.infer<
  typeof CreateTherapistPayloadSchema
>;

export const CreateTherapistResponseSchema = z.object({
  ...PersonSchema.shape,
  id: z.number(),
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  fullName: z.string(),
  age: z.number(),
  identificationNumber: z.string(),
  phoneNumber: z.string().optional(),
  children: z.array(ListPatientResponseSchema).nullable().optional(),
  activities: z.array(ActivitySchema).nullable().optional(),
});
export type CreateTherapistResponse = z.infer<
  typeof CreateTherapistResponseSchema
>;
