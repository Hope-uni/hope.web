import { z } from 'zod';
import { TEAPhaseSchema } from '@/models/schema';

export const ActivitySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  satisfactoryPoints: z.number(),
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
});
export type SingleActivity = z.infer<typeof SingleActivitySchema>;

export const CurrentActivitySchema = ActivitySchema.extend({
  satisfactoryAttempts: z.number(),
  progress: z.number(),
});
export type CurrentActivity = z.infer<typeof CurrentActivitySchema>;
