import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';
import { RegexRules } from '@/constants/rules';
import { CharacterLimit, TextWhiteSpaceAndLenRule } from '@/constants/rules';

const limitScoreActivities = {
  min: 10,
  max: 20,
};

export const PhaseRules = {
  name: [
    {
      required: true,
      message: i18next.t('Phase.fields.name.rules.required'),
    },
    ...TextWhiteSpaceAndLenRule({
      minLen: CharacterLimit.min.default,
      maxLen: CharacterLimit.max.default,
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

        if (
          value < limitScoreActivities.min ||
          value > limitScoreActivities.max
        ) {
          return Promise.reject(
            i18next.t('Phase.fields.scoreActivities.rules.max_min_score', {
              min: limitScoreActivities.min,
              max: limitScoreActivities.max,
            }),
          );
        }

        if (!RegexRules.positiveInteger.test(value)) {
          return Promise.reject(
            i18next.t('Phase.fields.scoreActivities.rules.integer'),
          );
        }

        return Promise.resolve();
      },
    },
  ] as Rule[],
} as const;
