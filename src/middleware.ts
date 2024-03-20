import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './navigation';

export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: defaultLocale,

    localePrefix
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/(es|en)/:path*']
};