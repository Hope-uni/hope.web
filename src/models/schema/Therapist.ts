import { z } from 'zod';
import { UserSchema } from '@/models/schema';

export const TherapistSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    patientsInCharge: z.number(),
    user: UserSchema
});

export type Therapist = z.infer<typeof TherapistSchema>