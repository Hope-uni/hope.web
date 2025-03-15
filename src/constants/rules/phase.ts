import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';
import { RegexRules } from '@/constants/rules';
import { CharacterLimit, TextWhiteSpaceAndLenRule } from '@/constants/rules';

export const PhaseRules = {
  name: [
    {
      required: true,
      message: i18next.t('Phase.fields.name.rules.required'),
    },
    ...TextWhiteSpaceAndLenRule({
      minLen: CharacterLimit.min.name,
      maxLen: CharacterLimit.max.name,
      field: i18next.t('Phase.fields.name.label'),
    }),
  ] as Rule[],
  description: [
    {
      required: true,
      message: i18next.t('Phase.fields.description.rules.required'),
    },
    ...TextWhiteSpaceAndLenRule({
      minLen: CharacterLimit.min.descriptions,
      maxLen: CharacterLimit.max.descriptions,
      field: i18next.t('Phase.fields.description.label'),
    }),
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
