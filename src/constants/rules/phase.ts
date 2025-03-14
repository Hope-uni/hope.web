import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';
import { RegexRules } from '@/constants/rules';
import {
  CharacterLimit,
  TextWhiteSpaceWithMaxLenRule,
} from '@/constants/rules';

export const PhaseRules = {
  name: [
    {
      required: true,
      message: i18next.t('Phase.fields.name.rules.required'),
    },
    ...TextWhiteSpaceWithMaxLenRule(
      CharacterLimit.name,
      i18next.t('Phase.fields.name.label'),
    ),
  ] as Rule[],
  description: [
    {
      required: true,
      message: i18next.t('Phase.fields.description.rules.required'),
    },
    ...TextWhiteSpaceWithMaxLenRule(
      CharacterLimit.descriptions,
      i18next.t('Phase.fields.description.label'),
    ),
  ] as Rule[],
  scoreActivities: [
    {
      required: true,
      message: i18next.t('Phase.fields.scoreActivities.rules.required'),
    },
    {
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        if (RegexRules.positiveInteger.test(value)) {
          return Promise.resolve();
        }

        return Promise.reject(
          i18next.t('Phase.fields.scoreActivities.rules.integer'),
        );
      },
    },
  ] as Rule[],
} as const;
