import { z } from 'zod';
import {
  PersonSchema,
  RoleSchema,
  RoleWithPermissionsSchema,
} from '@/models/schema';
import dayjs, { type Dayjs } from 'dayjs';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  roles: z.array(RoleWithPermissionsSchema),
});
export type User = z.infer<typeof UserSchema>;

export const ProfileSchema = PersonSchema.extend({
  profileId: z.string().optional(),
  identificationNumber: z.string(),
});

export const SingleUserSchema = UserSchema.extend({
  profileId: z.string().optional(),
  roles: z.array(RoleSchema),
});
export type SingleUser = z.infer<typeof SingleUserSchema>;

export const CreateUserPayloadSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>;

export const FormCreateUserSchema = z
  .object({
    ...PersonSchema.shape,
    role: RoleSchema.optional(),
    teaDegreeId: z.union([z.number(), z.string()]),
    phaseId: z.union([z.number(), z.string()]),
    tutorId: z.union([z.number(), z.string()]),
    observations: z.string().optional(),
    birthday: z.instanceof(dayjs as unknown as typeof Dayjs),
    identificationNumber: z.string(),
    phoneNumber: z.string().optional().nullable(),
    telephone: z.string().optional().nullable(),
  })
  .partial()
  .extend({
    id: z.string().optional(),
    ...CreateUserPayloadSchema.shape,
  });
export type FormCreateUser = z.infer<typeof FormCreateUserSchema>;
export type FormCreateUserError = Record<
  keyof z.infer<typeof FormCreateUserSchema>,
  string
>;

export const CreateUserSteps = z.object({
  title: z.string(),
  description: z.string(),
});

export const UserProfileCardSchema = z
  .object({
    id: z.number(),
    userId: z.number(),
    fullName: z.string(),
    username: z.string(),
    image: z.string().nullable(),
    age: z.number().optional(),
    gender: z.string().optional(),
  })
  .nullable();
export type UserProfileCard = z.infer<typeof UserProfileCardSchema>;
