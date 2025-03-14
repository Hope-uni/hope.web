import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';
import {
  CharacterLimit,
  CommonRules,
  TextWhiteSpaceWithMaxLenRule,
} from '@/constants/rules';

const Pictogram_Name_Max_Len = 30;
const Pictogram_Satisfactory_Points_Max = 20;
const Pictogram_Sentence_Max = 15;

export const ActivityRules = {
  name: [
    {
      required: true,
      message: i18next.t('Activity.fields.name.rules.required'),
    },
    {
      max: Pictogram_Name_Max_Len,
      message: i18next.t('Activity.fields.name.rules.len'),
    },
    ...CommonRules.textWhiteSpace,
  ] as Rule[],
  description: [
    {
      required: true,
      message: i18next.t('Activity.fields.description.rules.required'),
    },
    ...TextWhiteSpaceWithMaxLenRule(
      CharacterLimit.descriptions,
      i18next.t('Activity.fields.description.label'),
    ),
  ] as Rule[],
  satisfactoryPoints: [
    {
      required: true,
      message: i18next.t('Activity.fields.satisfactoryPoints.rules.required'),
    },
    {
      validator: async (_, value) => {
        if (!value) {
          return Promise.resolve();
        }

        if (Number(value) > Pictogram_Satisfactory_Points_Max) {
          return Promise.reject(
            i18next.t('Activity.fields.satisfactoryPoints.rules.max', {
              points: Pictogram_Satisfactory_Points_Max,
            }),
          );
        }
      },
    },
  ] as Rule[],
  phase: [
    {
      required: true,
      message: i18next.t('Activity.fields.phase.rules.required'),
    },
  ] as Rule[],
  pictogramSentence: [
    {
      validator: async (_, value) => {
        if (!value) {
          return Promise.resolve();
        }

        if (value.length === 0) {
          return Promise.reject(
            i18next.t('Activity.fields.pictogramSentence.rules.min'),
          );
        }

        if (value.length > Pictogram_Sentence_Max) {
          return Promise.reject(
            i18next.t('Activity.fields.pictogramSentence.rules.max', {
              limit: Pictogram_Sentence_Max,
            }),
          );
        }
      },
    },
  ] as Rule[],
} as const;
