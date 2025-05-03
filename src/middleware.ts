import {
  AuthRoutes,
  DEFAULT_REDIRECT_HOME_URL,
  DEFAULT_REDIRECT_LOGIN_URL,
  DEFAULT_REDIRECT_TO_CHANGE_PASSWORD_URL,
  RedirectIfVerifiedRoutes,
} from '@/constants';
import { getToken } from 'next-auth/jwt';
import { NextURL } from 'next/dist/server/web/next-url';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { UserTokenJWT } from '@/types/auth';

export { default } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as UserTokenJWT;

  const homeUrl = `${req.nextUrl.origin}${DEFAULT_REDIRECT_HOME_URL}`;
  const changePasswordUrl = `${req.nextUrl.origin}${DEFAULT_REDIRECT_TO_CHANGE_PASSWORD_URL}`;

  if (pathname === '/') {
    return NextResponse.redirect(homeUrl);
  }

  if (!token && !AuthRoutes.some((route) => pathname.startsWith(route))) {
    const loginUrl = new NextURL(DEFAULT_REDIRECT_LOGIN_URL, origin);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (
    token &&
    RedirectIfVerifiedRoutes.some((route) => pathname.startsWith(route)) &&
    token.user?.userVerified
  ) {
    return NextResponse.redirect(homeUrl);
  }

  if (
    token &&
    !token.user?.userVerified &&
    !pathname.startsWith(DEFAULT_REDIRECT_TO_CHANGE_PASSWORD_URL)
  ) {
    return NextResponse.redirect(changePasswordUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*', '/change-temporary-password'],
};
