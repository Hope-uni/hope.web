import { z } from 'zod';
import { ProfileSchema, UserSchema } from '@/schema/User';

export const LoginPayloadSchema = z.object({
  email_username: z.string(),
  password: z.string(),
});

export const MePayloadSchema = z.object({
  accessToken: z.string(),
});

export const ForgotPasswordPayloadSchema = z.object({
  email_username: z.string(),
});

export const ResetPasswordPayloadSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const MeResponseSchema = UserSchema.extend({
  profile: ProfileSchema,
  superAdmin: z.boolean().optional().default(false),
  admin: z.boolean().optional().default(false),
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordPayloadSchema>;
export type ResetPasswordPayload = z.infer<typeof ResetPasswordPayloadSchema>;
export type MePayload = z.infer<typeof MePayloadSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type MeResponse = z.infer<typeof MeResponseSchema>;
