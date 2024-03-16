import createMiddleware from 'next-intl/middleware';
import { HopeLocales } from '@/constants/index';

export default createMiddleware({
    // A list of all locales that are supported
    locales: HopeLocales.languages,

    // Used when no locale matches
    defaultLocale: HopeLocales.default
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(es|en)/:path*']
};