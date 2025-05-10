import React, { ReactNode } from 'react';
import { useCan } from '@/lib/access-guard/hooks';
import { Denied } from '@/lib/access-guard/components';
import { MethodGuardValidation } from '@/lib/access-guard/helpers';
import { PermissionType } from '@/constants/guards';
import { RoleType } from '@/constants/guards/types';

interface Props {
  allowed?: PermissionType[];
  denied?: PermissionType[];
  rolAllowed?: RoleType[];
  returnDenied?: boolean;
  children: ReactNode;
}

export default function Can({
  allowed = [],
  denied = [],
  rolAllowed = [],
  returnDenied = false,
  children,
}: Props) {
  const { can, isSuperadmin } = useCan();

  const canAccess = (): boolean => {
    let isAuthorized = true;

    if (isSuperadmin) {
      return isAuthorized;
    }

    if (allowed.length > 0) {
      isAuthorized = can(allowed, MethodGuardValidation.PERMISSION);
    }

    if (denied.length > 0) {
      isAuthorized = !can(denied, MethodGuardValidation.PERMISSION);
    }

    if (rolAllowed.length > 0) {
      isAuthorized = can(rolAllowed, MethodGuardValidation.ROLE);
    }

    return isAuthorized;
  };

  const isAuthorized = canAccess();

  return <>{isAuthorized ? children : returnDenied ? <Denied /> : null}</>;
}
