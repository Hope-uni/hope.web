import {
  AuthRoutes,
  DEFAULT_REDIRECT_HOME_URL,
  DEFAULT_REDIRECT_LOGIN_URL,
} from '@/constants';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';

export { default } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const homeUrl = `${req.nextUrl.origin}${DEFAULT_REDIRECT_HOME_URL}`;

  if (pathname === '/') {
    return NextResponse.redirect(homeUrl);
  }

  if (!token && !AuthRoutes.some((route) => pathname.startsWith(route))) {
    const loginUrl = new NextURL(DEFAULT_REDIRECT_LOGIN_URL, origin);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && AuthRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*'],
};
