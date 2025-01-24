import { z } from 'zod';
import { RoleSchema } from '@/models/schema';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  roles: z.array(RoleSchema),
});

export const ProfileSchema = z.object({
  profileId: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  surname: z.string(),
  secondSurname: z.string(),
  image: z.string(),
  identificationNumber: z.string(),
  phoneNumber: z.string(),
  telephone: z.string(),
  address: z.string(),
  birthday: z.string(),
  gender: z.string(),
});

export type User = z.infer<typeof UserSchema>;
