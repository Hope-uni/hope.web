import {
  AuthRoutes,
  DEFAULT_REDIRECT_HOME_URL,
  DEFAULT_REDIRECT_LOGIN_URL,
} from '@/constants';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { getServerSession } from 'next-auth';

type Props = {
  children: React.ReactNode;
};

const AuthorizationProvider = async ({ children }: Props) => {
  const session = await getServerSession();

  // console.log(session, '********session***********');

  /* if (!session || !session.user) {
    console.log('entra here');
    redirect(DEFAULT_REDIRECT_LOGIN_URL);
  }

  useEffect(() => {
    if (
      status === 'unauthenticated' &&
      AuthRoutes.some((route) => pathname !== route)
    ) {
      Router.replace(DEFAULT_REDIRECT_LOGIN_URL);
    }

    if (
      status === 'authenticated' &&
      AuthRoutes.some((route) => pathname === route)
    ) {
      router.replace(DEFAULT_REDIRECT_HOME_URL);
    }
  }, [status, router, pathname]); */

  return <>{children}</>;
};

export default AuthorizationProvider;
