import { z } from 'zod';

export const TEAGradeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const TEAPhaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  scoreActivities: z.number(),
});

export const PECSSchema = z.object({
  grades: TEAGradeSchema,
  phases: TEAPhaseSchema,
});

export type PECS = z.infer<typeof PECSSchema>;
export type TEAGrade = z.infer<typeof TEAGradeSchema>;
export type TEAPhase = z.infer<typeof TEAPhaseSchema>;
