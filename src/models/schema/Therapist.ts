import { z } from 'zod';

export const TherapistSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    patientsInCharge: z.number(),
});

export type Therapist = z.infer<typeof TherapistSchema>