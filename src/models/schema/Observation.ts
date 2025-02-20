import { z } from 'zod';

export const ObservationSchema = z.object({
  id: z.number(),
  description: z.string(),
  username: z.string(),
  createAt: z.string(),
});
export type Observation = z.infer<typeof ObservationSchema>;
