import { z } from 'zod';

export const PictogramCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
});
export type PictogramCategory = z.infer<typeof PictogramCategorySchema>;

export const PictogramSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  category: PictogramCategorySchema,
});
export type Pictogram = z.infer<typeof PictogramSchema>;
