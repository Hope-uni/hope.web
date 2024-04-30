import { z } from 'zod';
import { RoleSchema } from '@/models/schema';

export const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    imageProfile: z.string(),
    role: RoleSchema
});

export type User = z.infer<typeof UserSchema>