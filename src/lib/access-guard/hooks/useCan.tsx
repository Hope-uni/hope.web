import { PermissionType, ROLES } from '@/constants/guards';
import { usePermissions } from '@/lib/access-guard/hooks';
import { checkPermissions, checkRole } from '@/lib/access-guard/utils';
import {
  MethodGuardValidation,
  MethodGuardValidationType,
} from '@/lib/access-guard/helpers';
import { RoleType } from '@/constants/guards/types';

export default function useCan() {
  const { permissions, roles } = usePermissions();

  const isSuperadmin = roles.includes(ROLES.SUPERADMIN);

  const can = (
    allowed: PermissionType[] | RoleType[],
    methodValidation: MethodGuardValidationType,
  ) => {
    if (isSuperadmin) {
      return true;
    }

    if (methodValidation === MethodGuardValidation.PERMISSION) {
      return checkPermissions(permissions, allowed as PermissionType[]);
    }
    if (methodValidation === MethodGuardValidation.ROLE) {
      return checkRole(roles, allowed as RoleType[]);
    }

    return false;
  };

  return {
    can,
    isSuperadmin,
  };
}
