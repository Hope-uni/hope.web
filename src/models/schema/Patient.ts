import { z } from 'zod';
import {
  CurrentActivitySchema,
  PersonSchema,
  SingleActivitySchema,
  TEAGradeSchema,
  TEAPhaseSchema,
  UserSchema,
  AchievementSchema,
  ObservationSchema,
  PictogramSchema,
} from '@/models/schema';

export const PatientSchema = z.object({
  id: z.number(),
  userId: z.string(),
  fullName: z.string(),
  age: z.string(),
  teaGrade: TEAGradeSchema,
  phase: TEAPhaseSchema,
  achievementCount: z.number(),
  user: UserSchema,
});
export type Patient = z.infer<typeof PatientSchema>;

export const TherapistTutorInPatientSchema = z.object({
  id: z.number(),
  userId: z.number(),
  image: z.string().nullable(),
  fullName: z.string(),
  email: z.string(),
  username: z.string(),
  phoneNumber: z.any().optional(),
  telephone: z.any().optional(),
  childrenInCharge: z.number().optional(),
});
export type TherapistTutorInPatient = z.infer<
  typeof TherapistTutorInPatientSchema
>;

export const ListPatientResponseSchema = z.object({
  id: z.number(),
  userId: z.string(),
  fullName: z.string(),
  age: z.number(),
  teaDegree: TEAGradeSchema,
  currentPhase: TEAPhaseSchema,
  achievementCount: z.number(),
  image: z.string().optional().nullable(),
});
export type ListPatientResponse = z.infer<typeof ListPatientResponseSchema>;

export const CreatePatientResponseSchema = z.object({
  ...PersonSchema.shape,
  id: z.number(),
  userId: z.string(),
  username: z.string(),
  fullName: z.string(),
  age: z.number(),
  teaDegree: TEAGradeSchema,
  currentPhase: TEAPhaseSchema,
  phaseProgress: z.string(),
  telephone: z.any().optional(),
  observations: z.array(ObservationSchema).nullable(),
  tutor: TherapistTutorInPatientSchema,
  therapist: TherapistTutorInPatientSchema,
  currentActivity: CurrentActivitySchema.nullable(),
  activities: z.array(SingleActivitySchema).nullable(),
  pictograms: z.array(PictogramSchema).nullable(),
  achievements: z.array(AchievementSchema),
});
export type CreatePatientResponse = z.infer<typeof CreatePatientResponseSchema>;
