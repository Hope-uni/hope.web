import {
  DEFAULT_REDIRECT_HOME_URL,
  DEFAULT_REDIRECT_LOGIN_URL,
  DEFAULT_REDIRECT_TO_CHANGE_PASSWORD_URL,
  DEFAULT_REDIRECT_UNAUTHORIZED,
} from '@/constants';
import {
  createAbsoluteUrl,
  middlewareGuards,
} from '@/lib/middleware-guard/utils';
import { UserTokenJWT } from '@/types/auth';
import { getTokenUSer } from '@/utils/session';
import { NextURL } from 'next/dist/server/web/next-url';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const token = (await getTokenUSer(req)) as UserTokenJWT;
  const guards = middlewareGuards(token, pathname);

  const homeUrl = createAbsoluteUrl(origin, DEFAULT_REDIRECT_HOME_URL);

  if (guards.isIndexRoute()) {
    return NextResponse.redirect(homeUrl);
  }

  if (guards.shouldRedirectToLogin()) {
    const loginUrl = new NextURL(DEFAULT_REDIRECT_LOGIN_URL, origin);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (guards.shouldRedirectToHome()) {
    return NextResponse.redirect(homeUrl);
  }

  if (guards.shouldRedirectToChangePassword()) {
    const changePasswordUrl = createAbsoluteUrl(
      origin,
      DEFAULT_REDIRECT_TO_CHANGE_PASSWORD_URL,
    );
    return NextResponse.redirect(changePasswordUrl);
  }

  if (token && guards.shouldRedirectToUnauthorized()) {
    const unauthorizedUrl = createAbsoluteUrl(
      origin,
      DEFAULT_REDIRECT_UNAUTHORIZED,
    );
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*', '/change-temporary-password'],
};
