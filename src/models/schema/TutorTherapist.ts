import { z } from 'zod';
import { CreateUserPayloadSchema } from './User';
import { PersonSchema } from './Person';
import dayjs, { type Dayjs } from 'dayjs';

export const SingleTutorTherapistSchema = z.object({
  id: z.number(),
  userId: z.number(),
  image: z.string().nullable(),
  fullName: z.string(),
  email: z.string(),
  username: z.string(),
  phoneNumber: z.any().optional(),
  telephone: z.any().optional(),
  childrenInCharge: z.number().optional(),
});
export type SingleTutorTherapist = z.infer<typeof SingleTutorTherapistSchema>;

export const PayloadTutorTherapistSchema = CreateUserPayloadSchema.merge(
  PersonSchema,
).extend({
  birthday: z
    .instanceof(dayjs as unknown as typeof Dayjs)
    .transform((val) => val.format('YYYY-MM-DD')),
  identificationNumber: z.string(),
  phoneNumber: z.string().optional(),
  telephone: z.string().optional(),
});
export type PayloadTutorTherapist = z.infer<typeof PayloadTutorTherapistSchema>;

export const UpdateTutorTherapistResponseSchema =
  PayloadTutorTherapistSchema.extend({
    id: z.number(),
    birthday: z.string(),
  });
export type UpdateTutorTherapistResponse = z.infer<
  typeof UpdateTutorTherapistResponseSchema
>;
