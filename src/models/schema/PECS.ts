import { z } from 'zod';

export const TEAGradeSchema = z.enum(["1", "2", "3"]);
export const TEAPhaseSchema = z.enum(["Fase 1", "Fase 2", "Fase 3"]);

export const PECSSchema = z.object({
    grades: TEAGradeSchema,
    phases: TEAPhaseSchema
});

export type PECS = z.infer<typeof PECSSchema>;
export type TEAGrade = z.infer<typeof TEAGradeSchema>
export type TEAPhase = z.infer<typeof TEAPhaseSchema>