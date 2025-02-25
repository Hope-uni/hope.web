import { z } from 'zod';

export const PayloadCategoryPictogramSchema = z.object({
  name: z.string(),
  icon: z.string(),
});
export type PayloadCategory = z.infer<typeof PayloadCategoryPictogramSchema>;
export type FormCategoryErrors = Record<
  keyof z.infer<typeof PayloadCategoryPictogramSchema>,
  string
>;

export const CategoryPictogramSchema = PayloadCategoryPictogramSchema.extend({
  id: z.number(),
});
export type CategoryPictogram = z.infer<typeof CategoryPictogramSchema>;

export const PictogramSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
});
export type Pictogram = z.infer<typeof PictogramSchema>;

export const PayloadPictogramSchema = PictogramSchema.extend({
  id: z.number(),
  categoryId: z.union([z.number(), z.string()]),
});
export type PayloadPictogram = z.infer<typeof PayloadPictogramSchema>;

export const SinglePictogramSchema = PictogramSchema.extend({
  id: z.number(),
  category: CategoryPictogramSchema,
});
export type SinglePictogram = z.infer<typeof SinglePictogramSchema>;
