import { z } from 'zod';

export const AchievementSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().nullable(),
});
export type Achievement = z.infer<typeof AchievementSchema>;

export const ObservationSchema = z.object({
  id: z.number(),
  description: z.string(),
  username: z.string(),
  createAt: z.string(),
});
export type Observation = z.infer<typeof ObservationSchema>;
