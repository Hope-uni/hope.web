import { z } from 'zod';
import { RoleSchema, RoleWithPermissionsSchema } from '@/models/schema';
import dayjs, { type Dayjs } from 'dayjs';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  roles: z.array(RoleWithPermissionsSchema),
});

export const PersonSchema = z.object({
  firstName: z.string(),
  secondName: z.string().optional(),
  surname: z.string(),
  secondSurname: z.string().optional(),
  image: z.string(),
  address: z.string(),
  birthday: z.string(),
  gender: z.enum(['Masculino', 'Femenino']),
});

export const ProfileSchema = PersonSchema.extend({
  profileId: z.string(),
  identificationNumber: z.string(),
  birthday: z.string(),
  gender: z.string(),
});

export const ListUserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  roles: z.array(RoleSchema),
});

export const CreateUserPayloadSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

export const CreatePatientPayloadSchema = CreateUserPayloadSchema.merge(
  PersonSchema.omit({ image: true }),
).extend({
  imageProfile: z.string().url().optional(),
  birthday: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .transform((val) => val.format('YYYY-MM-DD')),
  teaDegreeId: z.union([z.number(), z.string()]),
  phaseId: z.union([z.number(), z.string()]),
  tutorId: z.union([z.number(), z.string()]),
  observations: z.string().optional(),
});

export const CreateTherapistTutorPayloadSchema = CreateUserPayloadSchema.merge(
  PersonSchema.omit({ image: true }),
).extend({
  imageProfile: z.string().url().optional(),
  birthday: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .transform((val) => val.format('YYYY-MM-DD'))
    .optional(),
  identificationNumber: z.string(),
  phoneNumber: z.string().optional(),
  telephone: z.string().optional(),
});

export const FormCreateUserSchema = z
  .object({
    ...PersonSchema.shape,
    ...CreatePatientPayloadSchema.shape,
    ...CreateTherapistTutorPayloadSchema.shape,
    birthday: z.instanceof(dayjs as unknown as typeof Dayjs),
  })
  .partial()
  .extend({
    ...CreateUserPayloadSchema.shape,
  });

export const CreateUserSteps = z.object({
  title: z.string(),
  description: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type ListUserResponse = z.infer<typeof ListUserResponseSchema>;

export type FormCreateUser = z.infer<typeof FormCreateUserSchema>;
export type FormCreateUserError = Record<
  keyof z.infer<typeof FormCreateUserSchema>,
  string
>;
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>;
export type CreateUserResponse = z.infer<typeof CreateUserPayloadSchema>;

export type CreatePatientPayload = z.infer<typeof CreatePatientPayloadSchema>;
export type CreateTherapistTutorPayload = z.infer<
  typeof CreateTherapistTutorPayloadSchema
>;
