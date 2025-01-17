import { z } from 'zod';

export const LoginPayloadSchema = z.object({
    email_username: z.string(),
    password: z.string(),
});

export const LoginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;