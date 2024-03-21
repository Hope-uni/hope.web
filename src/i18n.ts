import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { HopeLocales } from '@/constants/index';
import { _ } from '../messages/es';

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!HopeLocales.languages.includes(locale as any)) {
        notFound();
    };

    return {
        messages: { _ }
    };
});