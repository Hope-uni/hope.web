import { z } from 'zod';
import { TEAPhaseSchema } from '@/models/schema';

export const PictogramsSolutionSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
});

export const BaseActivitySchema = z.object({
  name: z.string(),
  description: z.string(),
  satisfactoryPoints: z.number(),
});

export const UserActivitySchema = z.object({
  id: z.number(),
  username: z.string(),
});

export const ActivitySchema = BaseActivitySchema.extend({
  id: z.number(),
  phase: TEAPhaseSchema,
});
export type Activity = z.infer<typeof ActivitySchema>;

export const SingleActivitySchema = ActivitySchema.extend({
  assignments: z
    .array(
      z.object({
        id: z.number(),
      }),
    )
    .nullable(),
  user: UserActivitySchema,
});
export type SingleActivity = z.infer<typeof SingleActivitySchema>;

export const DetailActivitySchema = SingleActivitySchema.extend({
  activitySolution: z.array(PictogramsSolutionSchema),
});
export type DetailActivity = z.infer<typeof DetailActivitySchema>;

export const CurrentActivitySchema = ActivitySchema.extend({
  satisfactoryAttempts: z.number(),
  progress: z.number(),
  user: UserActivitySchema,
});
export type CurrentActivity = z.infer<typeof CurrentActivitySchema>;

export const PayloadActivitySchema = BaseActivitySchema.extend({
  pictogramSentence: z.array(z.number()),
  phaseId: z.union([z.number(), z.string()]),
});
export type PayloadActivity = z.infer<typeof PayloadActivitySchema>;
export type FormActivityErrors = Record<
  keyof z.infer<typeof PayloadActivitySchema>,
  string
>;

export const UpdateActivityResponseSchema = z.object({
  id: z.number(),
  pictogramSentence: z.array(z.number()),
  phase: TEAPhaseSchema,
  user: UserActivitySchema,
});
export type UpdateActivityResponse = z.infer<
  typeof UpdateActivityResponseSchema
>;
