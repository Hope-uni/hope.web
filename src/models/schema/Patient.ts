import { z } from 'zod';
import { TEAGradeSchema, TEAPhaseSchema, UserSchema } from '@/models/schema';

export const PatientSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  age: z.string(),
  teaGrade: TEAGradeSchema,
  teaPhase: TEAPhaseSchema,
  achievementCount: z.number(),
  user: UserSchema,
});

export const TutorInPatientSchema = z.object({
  id: z.number(),
  userId: z.number(),
  image: z.string(),
  fullName: z.string(),
  username: z.string(),
  correo: z.string(),
  telefono: z.number(),
});

export const CreatePatientResponseSchema = z.any();

export type Patient = z.infer<typeof PatientSchema>;
export type CreatePatientResponse = z.infer<typeof CreatePatientResponseSchema>;
