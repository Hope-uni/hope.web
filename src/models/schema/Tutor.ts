import { z } from 'zod';
import {
  CreateUserPayloadSchema,
  PersonSchema,
  UserSchema,
} from '@/models/schema';

export const TutorSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  telephone: z.string(),
  patientsInCharge: z.number(),
  user: UserSchema,
});

export const CreateTutorPayloadSchema = CreateUserPayloadSchema.merge(
  PersonSchema,
).extend({
  identificationNumber: z.string(),
  phoneNumber: z.string(),
  telephone: z.string(),
});

export const ListTutorResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  fullName: z.string(),
  username: z.string(),
  phoneNumber: z.string(),
  telephone: z.string(),
  children: z.array(z.any()),
  image: z.string(),
});

export const CreateTutorResponseSchema = z.any();

export type Tutor = z.infer<typeof TutorSchema>;
export type CreateTutorPayload = z.infer<typeof CreateTutorPayloadSchema>;
export type ListTutorResponse = z.infer<typeof ListTutorResponseSchema>;
export type CreateTutorResponse = z.infer<typeof CreateTutorResponseSchema>;
