import {
  AuthRoutes,
  DEFAULT_REDIRECT_HOME_URL,
  DEFAULT_REDIRECT_LOGIN_URL,
} from '@/constants';
import { useSession } from 'next-auth/react';
import { Suspense, useEffect, useState } from 'react';
import { redirect, usePathname, useRouter } from '@/intl-navigation';
import Loading from '@/app/[locale]/admin/loading';
import { getServerSession } from 'next-auth';

type Props = {
  children: React.ReactNode;
};

const AuthorizationProvider = async ({ children }: Props) => {
  const session = await getServerSession();
  console.log(session, 'sdsds');

  if (!session || !session.user) {
    redirect(DEFAULT_REDIRECT_LOGIN_URL);
  }

  /* useEffect(() => {
    if (
      status === 'unauthenticated' &&
      AuthRoutes.some((route) => pathname !== route)
    ) {
      router.replace(DEFAULT_REDIRECT_LOGIN_URL);
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
