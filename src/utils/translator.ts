import { createTranslator } from 'next-intl';
import { messages } from '../../messages/es';

export const t = createTranslator({ locale: 'es', messages: messages });