import { z } from 'zod';

export const AchievementSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
});

export type Achievement = z.infer<typeof AchievementSchema>