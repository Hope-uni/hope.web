import { HopeLocales } from '@/constants/index';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = [...HopeLocales.languages] as const;
export const defaultLocale = HopeLocales.default;
export const localePrefix = 'always'; // Default

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales, localePrefix });