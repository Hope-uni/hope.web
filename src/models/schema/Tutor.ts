import { z } from 'zod';
import { UserSchema } from '@/models/schema';

export const TutorSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    telephone: z.string(),
    patientsInCharge: z.number(),
    user: UserSchema
});

export type Tutor = z.infer<typeof TutorSchema>