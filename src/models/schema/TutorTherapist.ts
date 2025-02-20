import { z } from 'zod';

export const ListTutorTherapistResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  image: z.string().nullable(),
  fullName: z.string(),
  email: z.string(),
  username: z.string(),
  phoneNumber: z.string().optional(),
  childrenInCharge: z.number().optional(),
});
export type ListTutorTherapistResponse = z.infer<
  typeof ListTutorTherapistResponseSchema
>;
