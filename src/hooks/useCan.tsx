import { checkPermissions, checkRole } from '@/utils/checkPermission';
import usePermissions from '@/hooks/usePermissions';

export default function useCan() {
  const { permissions, roles } = usePermissions();

  const isSuperadmin = roles.includes('Superadmin') ? true : false;

  const can = (allowed: [], guard: string) => {
    if (isSuperadmin) {
      return true;
    }

    if (guard === 'permission') {
      return checkPermissions(permissions, allowed);
    }
    if (guard === 'role') {
      return checkRole(roles, allowed);
    }

    return false;
  };

  return {
    can,
    isSuperadmin,
  };
}
