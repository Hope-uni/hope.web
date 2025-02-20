import { z } from 'zod';

export const AchievementSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().nullable(),
});
export type Achievement = z.infer<typeof AchievementSchema>;
