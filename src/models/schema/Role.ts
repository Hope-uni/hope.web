import { z } from 'zod';

export const PermissionSchema = z.object({
  id: z.number(),
  description: z.string(),
  status: z.boolean(),
});

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  permissions: z.array(PermissionSchema),
});

export type Role = z.infer<typeof RoleSchema>;
export type Permission = z.infer<typeof PermissionSchema>;
