import {
  AchievementSchema,
  CreateUserPayloadSchema,
  CurrentActivitySchema,
  ObservationSchema,
  PersonSchema,
  PictogramSchema,
  SingleActivitySchema,
  TEAGradeSchema,
  TEAPhaseSchema,
  SingleTutorTherapistSchema,
} from '@/models/schema';
import dayjs, { type Dayjs } from 'dayjs';
import { z } from 'zod';

export const SinglePatientSchema = z.object({
  id: z.number(),
  userId: z.string(),
  fullName: z.string(),
  age: z.number(),
  teaDegree: TEAGradeSchema,
  currentPhase: TEAPhaseSchema,
  achievementCount: z.number(),
  image: z.string().optional().nullable(),
});
export type SinglePatient = z.infer<typeof SinglePatientSchema>;

export const PayloadPatientSchema = CreateUserPayloadSchema.merge(
  PersonSchema,
).extend({
  birthday: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .transform((val) => val.format('YYYY-MM-DD')),
  teaDegreeId: z.union([z.number(), z.string()]),
  phaseId: z.union([z.number(), z.string()]),
  tutorId: z.union([z.number(), z.string()]),
  observations: z.string().optional(),
});
export type PayloadPatient = z.infer<typeof PayloadPatientSchema>;

export const UpdatePatientResponseSchema = PayloadPatientSchema.extend({
  id: z.number(),
  birthday: z.string(),
});
export type UpdatePatientResponse = z.infer<typeof UpdatePatientResponseSchema>;

export const DetailPatientSchema = z.object({
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
  tutor: SingleTutorTherapistSchema,
  therapist: SingleTutorTherapistSchema,
  currentActivity: CurrentActivitySchema.nullable(),
  activities: z.array(SingleActivitySchema).nullable(),
  pictograms: z.array(PictogramSchema).nullable(),
  achievements: z.array(AchievementSchema),
});
export type DetailPatient = z.infer<typeof DetailPatientSchema>;
