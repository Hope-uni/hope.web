import { z } from 'zod';
import { TEAPhaseSchema } from '@/models/schema';

export const ActivitySchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    assignments: z.number(),
    points: z.number(),
    teaPhase: TEAPhaseSchema,
});

export type Activity = z.infer<typeof ActivitySchema>