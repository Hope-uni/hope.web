import { z } from 'zod';

export const UploadFileSchema = z.object({
  uid: z.string(),
  name: z.string(),
  url: z.string().optional(),
  status: z.string().optional(),
  originFileObj: z.any().optional(),
});
