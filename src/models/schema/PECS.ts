import { z } from 'zod';

export const TEAGradeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});
export type TEAGrade = z.infer<typeof TEAGradeSchema>;

export const PayloadPhaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  scoreActivities: z.number(),
});
export type PayloadPhase = z.infer<typeof PayloadPhaseSchema>;
export type FormPhaseErrors = Record<
  keyof z.infer<typeof PayloadPhaseSchema>,
  string
>;

export const TEAPhaseSchema = PayloadPhaseSchema.extend({
  id: z.number(),
});
export type TEAPhase = z.infer<typeof TEAPhaseSchema>;

export const PECSSchema = z.object({
  grades: TEAGradeSchema,
  phases: TEAPhaseSchema,
});
export type PECS = z.infer<typeof PECSSchema>;
