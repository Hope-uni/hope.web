import { PermissionType } from '@/constants/guards';
import { RoleType } from '@/constants/guards/types';
import { UserSession } from '@/models/types';
import { getSession } from 'next-auth/react';

export const getPermission = async () => {
  const session = await getSession();
  const UserSession = session?.user as UserSession;

  const roles: RoleType[] = [];
  const permissions: PermissionType[] = [];

  if (UserSession?.roles && UserSession?.roles?.length > 0) {
    UserSession?.roles.forEach((item) => {
      roles.push(item.name as RoleType);
      const permissionsName = item.permissions.map(
        (item) => item.code,
      ) as PermissionType[];
      permissions.push(...permissionsName);
    });
  }

  return {
    roles,
    permissions,
  };
};
