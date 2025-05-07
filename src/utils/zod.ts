import { ZodSchema } from 'zod';

export function validateOptional<T>(
  schema: ZodSchema<T>,
  value: unknown,
): T | null {
  const result = schema.safeParse(value);
  return result.success ? result.data : null;
}
