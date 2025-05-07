import {
  AchievementSchema,
  CreateUserPayloadSchema,
  CurrentActivitySchema,
  ObservationSchema,
  PersonSchema,
  SinglePictogramSchema,
  SingleActivitySchema,
  TEAGradeSchema,
  TEAPhaseSchema,
  SingleTutorTherapistSchema,
} from '@/models/schema';
import dayjs, { type Dayjs } from 'dayjs';
import { z } from 'zod';

export const SinglePatientSchema = z.object({
  id: z.number(),
  userId: z.number(),
  fullName: z.string(),
  age: z.number(),
  teaDegree: TEAGradeSchema,
  currentPhase: TEAPhaseSchema,
  achievementCount: z.number().optional(),
  image: z.string().optional().nullable(),
});
export type SinglePatient = z.infer<typeof SinglePatientSchema>;

export const PayloadPatientSchema = CreateUserPayloadSchema.merge(
  PersonSchema,
).extend({
  birthday: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .transform((val) => val.format('YYYY-MM-DD')),
  tutorId: z.union([z.number(), z.string()]),
  observations: z.string().optional(),
});
export type PayloadPatient = z.infer<typeof PayloadPatientSchema>;

export const PayloadCreatePatientSchema = PayloadPatientSchema.extend({
  phaseId: z.union([z.number(), z.string()]),
  teaDegreeId: z.union([z.number(), z.string()]),
});
export type PayloadCreatePatient = z.infer<typeof PayloadCreatePatientSchema>;

export const FiltersPatientSchema = z.object({
  activityId: z.number().optional(),
  hasActiveActivity: z.boolean().optional(),
});
export type FiltersPatient = z.infer<typeof FiltersPatientSchema>;

export const UpdatePatientResponseSchema = PayloadPatientSchema.extend({
  id: z.number(),
  birthday: z.string(),
  phaseId: z.union([z.number(), z.string()]),
  teaDegreeId: z.union([z.number(), z.string()]),
});
export type UpdatePatientResponse = z.infer<typeof UpdatePatientResponseSchema>;

export const ProgressPECSSchema = z.object({
  generalProgress: z.string(),
  phaseProgress: z.string(),
});

export const DetailPatientSchema = z.object({
  ...PersonSchema.shape,
  id: z.number(),
  userId: z.string(),
  username: z.string(),
  fullName: z.string(),
  age: z.number(),
  teaDegree: TEAGradeSchema,
  currentPhase: TEAPhaseSchema,
  progress: ProgressPECSSchema,
  phaseProgress: z.string(),
  telephone: z.any().optional(),
  observations: z.array(ObservationSchema).nullable(),
  tutor: SingleTutorTherapistSchema,
  therapist: SingleTutorTherapistSchema,
  currentActivity: CurrentActivitySchema.nullable(),
  activities: z.array(SingleActivitySchema).nullable(),
  pictograms: z.array(SinglePictogramSchema).nullable(),
  achievements: z.array(AchievementSchema),
});
export type DetailPatient = z.infer<typeof DetailPatientSchema>;
