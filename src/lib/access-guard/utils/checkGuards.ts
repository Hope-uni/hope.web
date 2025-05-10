import { PermissionType } from '@/constants/guards';
import { RoleType } from '@/constants/guards/types';

export const checkPermissions = (
  userPermissions: PermissionType[],
  permissionsToCheck: PermissionType[] = [],
): boolean => {
  if (!userPermissions) return false;

  /** No permissions required
   */
  if (!permissionsToCheck) {
    return true;
  }

  return permissionsToCheck.some((permission) =>
    userPermissions.includes(permission),
  );
};

export const checkRole = (
  userRole: RoleType[],
  rolesToCheck: RoleType[] = [],
) => {
  if (!userRole) return false;

  /** No roles required
   */
  if (!rolesToCheck) {
    return true;
  }

  console.log(rolesToCheck, userRole);

  return rolesToCheck.some((role) => userRole.includes(role));
};
