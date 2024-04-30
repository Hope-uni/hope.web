import { z } from 'zod';
import { TEAGradeSchema, TEAPhaseSchema, UserSchema } from '@/models/schema';

export const PatientSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    age: z.string(),
    teaGrade: TEAGradeSchema,
    teaPhase: TEAPhaseSchema,
    achievementCount: z.number(),
    user: UserSchema
});

export type Patient = z.infer<typeof PatientSchema>