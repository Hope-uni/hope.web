import { z } from 'zod';

export const PictogramSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
});

export type Pictogram = z.infer<typeof PictogramSchema>