import React, { ReactNode } from 'react';
import useCan from '@/hooks/useCan';
import Denied from '@/components/PermissionMiddleware/Denied';

interface Props {
  allowed?: [];
  denied?: [];
  rolAllowed?: [];
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

  const canAccess = () => {
    let isVisible = true;

    if (isSuperadmin) {
      return isVisible;
    }

    if (allowed) {
      isVisible = can(allowed, 'permission');
    }

    if (denied) {
      isVisible = !can(denied, 'permission');
    }

    if (rolAllowed) {
      isVisible = can(rolAllowed, 'role');
    }

    return isVisible;
  };

  return <>{canAccess() ? children : returnDenied ? <Denied /> : null}</>;
}
