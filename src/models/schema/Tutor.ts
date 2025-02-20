import {
  CreateUserPayloadSchema,
  ListPatientResponseSchema,
  PersonSchema,
  UserSchema,
} from '@/models/schema';
import { z } from 'zod';

export const TutorSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  telephone: z.string().optional(),
  patientsInCharge: z.number(),
  user: UserSchema,
});
export type Tutor = z.infer<typeof TutorSchema>;

export const CreateTutorPayloadSchema = CreateUserPayloadSchema.merge(
  PersonSchema,
).extend({
  identificationNumber: z.string(),
  phoneNumber: z.string().optional(),
  telephone: z.string().optional(),
});
export type CreateTutorPayload = z.infer<typeof CreateTutorPayloadSchema>;

export const ListTutorResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  image: z.string().nullable(),
  fullName: z.string(),
  email: z.string(),
  username: z.string(),
  phoneNumber: z.string(),
  telephone: z.string().optional(),
  childrenInCharge: z.number().optional().nullable(),
});
export type ListTutorResponse = z.infer<typeof ListTutorResponseSchema>;

export const CreateTutorResponseSchema = z.object({
  ...PersonSchema.shape,
  id: z.number(),
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  fullName: z.string(),
  age: z.number(),
  identificationNumber: z.string(),
  phoneNumber: z.ZodString().optional(),
  telephone: z.ZodString().optional(),
  children: z.array(ListPatientResponseSchema),
});
export type CreateTutorResponse = z.infer<typeof CreateTutorResponseSchema>;
