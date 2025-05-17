'use client';

import { AuthRoutes } from '@/constants';
import useLogout from '@/hooks/useLogout';
import { useOverlayStore } from '@/lib/store';
import { UserSession } from '@/models/types';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setOverlaySession } = useOverlayStore();
  const { data, status, update } = useSession();
  const { logout } = useLogout();
  const pathname = usePathname();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    setOverlaySession(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const syncSession = async () => {
      await update();
    };

    if (!data?.expires) {
      setOverlaySession(true);
      syncSession();
      return;
    }
    setOverlaySession(false);
  }, [data, setOverlaySession, update]);

  useEffect(() => {
    const validateSession = async () => {
      const session = data?.user as UserSession;
      const isAuthRoute = AuthRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (!session && !isAuthRoute && !hasLoggedOut.current) {
        hasLoggedOut.current = true;
        await logout();
        return;
      }
    };
    validateSession();
  }, [data, logout, pathname]);

  return <>{children}</>;
};
