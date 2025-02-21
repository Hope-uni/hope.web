import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';

export const CategoryRules = {
  name: [
    {
      required: true,
      message: i18next.t('Category.fields.name.rules.required'),
    },
  ] as Rule[],
  icon: [
    {
      required: true,
      message: i18next.t('Category.fields.icon.rules.required'),
    },
  ] as Rule[],
} as const;
