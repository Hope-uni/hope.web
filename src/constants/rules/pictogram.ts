import {
  CharacterLimit,
  TextWhiteSpaceWithMaxLenRule,
} from '@/constants/rules';
import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';

const Pictogram_Name_Max_Len = 60;

export const PictogramRules = {
  name: [
    {
      required: true,
      message: i18next.t('Pictogram.fields.name.rules.required'),
    },
    ...TextWhiteSpaceWithMaxLenRule(Pictogram_Name_Max_Len),
  ] as Rule[],
  category: [
    {
      required: true,
      message: i18next.t('Pictogram.fields.category.rules.required'),
    },
  ] as Rule[],
  image: [
    {
      required: true,
      message: i18next.t('Pictogram.fields.image.rules.required'),
    },
  ] as Rule[],
} as const;
