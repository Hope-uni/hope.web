import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';
import { CharacterLimit, TextWhiteSpaceAndLenRule } from '@/constants/rules';

export const AchievementRules = {
  name: [
    {
      required: true,
      message: i18next.t('Achievement.fields.name.rules.required'),
    },
    ...TextWhiteSpaceAndLenRule({
      minLen: CharacterLimit.min.name,
      maxLen: CharacterLimit.max.name,
      field: i18next.t('Achievement.fields.name.label'),
    }),
  ] as Rule[],
  image: [
    {
      required: true,
      message: i18next.t('Achievement.fields.image.rules.required'),
    },
  ] as Rule[],
  assignToPatient: [
    {
      required: true,
      message: i18next.t(
        'Achievement.fields.assign_achievements.rules.required',
      ),
    },
  ] as Rule[],
} as const;
