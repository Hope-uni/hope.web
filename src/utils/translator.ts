import { createTranslator } from 'next-intl';
import { _ } from '../../messages/es';

const translator = createTranslator({ locale: 'es', messages: { _ } });

export const t = translator;