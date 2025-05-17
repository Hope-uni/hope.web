import {
  AuthRoutes,
  DEFAULT_REDIRECT_TO_CHANGE_PASSWORD_URL,
  RedirectIfVerifiedRoutes,
  RoutesName,
} from '@/constants';
import { RouterGuards } from '@/constants/Menu';
import { UserTokenJWT } from '@/models/types';

export const middlewareGuards = (
  token: UserTokenJWT | null,
  pathname: string,
) => {
  return {
    isIndexRoute: () => pathname === RoutesName.index,

    shouldRedirectToLogin: () =>
      !token && !AuthRoutes.some((route) => pathname.startsWith(route)),

    shouldRedirectToHome: () =>
      token?.user?.userVerified &&
      RedirectIfVerifiedRoutes.some((route) => pathname.startsWith(route)),

    shouldRedirectToChangePassword: () =>
      token &&
      !token.user?.userVerified &&
      !pathname.startsWith(DEFAULT_REDIRECT_TO_CHANGE_PASSWORD_URL),

    shouldRedirectToUnauthorized: () => {
      if (!token || !token.user?.roles?.length) {
        return true;
      }

      const routeGuard = RouterGuards.find((route) => pathname === route.key);

      if (!routeGuard || !routeGuard.guard || routeGuard.guard.length === 0) {
        return false;
      }

      return !token.user.roles.some((role) =>
        routeGuard.guard && routeGuard.guard.length > 0
          ? routeGuard?.guard.includes(role)
          : false,
      );
    },
  };
};
