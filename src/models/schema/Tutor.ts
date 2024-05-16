import { z } from 'zod';

export const TutorSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    telephone: z.string(),
    patientsInCharge: z.number(),
});

export type Tutor = z.infer<typeof TutorSchema>