import { z } from 'zod';

export const PermissionSchema = z.object({
  id: z.number(),
  description: z.string(),
  status: z.boolean(),
});

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const RoleWithPermissionsSchema = RoleSchema.extend({
  permissions: z.array(PermissionSchema),
});

export const ListRoleResponseSchema = RoleSchema.merge(
  RoleWithPermissionsSchema,
).extend({
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;
export type RoleWithPermissions = z.infer<typeof RoleWithPermissionsSchema>;
export type Permission = z.infer<typeof PermissionSchema>;
export type ListRoleResponse = z.infer<typeof ListRoleResponseSchema>;
