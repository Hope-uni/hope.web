import { z } from 'zod';

export const BaseAchievementSchema = z.object({
  name: z.string(),
  imageUrl: z.string().nullable(),
});
export type BaseActivity = z.infer<typeof BaseAchievementSchema>;

export const AchievementSchema = BaseAchievementSchema.extend({
  id: z.number(),
});
export type Achievement = z.infer<typeof AchievementSchema>;

export const PayloadAchievementSchema = BaseAchievementSchema;
export type PayloadAchievement = z.infer<typeof PayloadAchievementSchema>;
export type FormAchievementErrors = Record<
  keyof z.infer<typeof PayloadAchievementSchema>,
  string
>;

export const PayloadAssignAchievementSchema = z.object({
  patientId: z.number(),
  achievementId: z.number(),
});
export type PayloadAssignAchievement = z.infer<
  typeof PayloadAssignAchievementSchema
>;

export const FiltersAchievementSchema = z.object({
  patientId: z.number().optional(),
});
export type FiltersAchievement = z.infer<typeof FiltersAchievementSchema>;
