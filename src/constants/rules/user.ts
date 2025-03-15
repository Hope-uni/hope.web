import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';
import {
  CharacterLimit,
  CommonRules,
  TextWhiteSpaceAndLenRule,
} from '@/constants/rules';

export const UserRules = {
  user: {
    user_role: [
      {
        required: true,
        message: i18next.t('User.fields.user_role.rules.required'),
      },
    ] as Rule[],
    first_name: [
      {
        required: true,
        message: i18next.t('User.fields.first_name.rules.required'),
      },
      ...TextWhiteSpaceAndLenRule({
        maxLen: CharacterLimit.max.name,
        field: i18next.t('User.fields.first_name.label'),
      }),
    ] as Rule[],
    second_name: [
      {
        required: true,
        message: i18next.t('User.fields.second_name.rules.required'),
      },
      ...TextWhiteSpaceAndLenRule({
        maxLen: CharacterLimit.max.name,
        field: i18next.t('User.fields.second_name.label'),
      }),
    ] as Rule[],
    first_surname: [
      {
        required: true,
        message: i18next.t('User.fields.first_surname.rules.required'),
      },
      ...TextWhiteSpaceAndLenRule({
        maxLen: CharacterLimit.max.name,
        field: i18next.t('User.fields.first_surname.label'),
      }),
    ] as Rule[],
    second_surname: [
      {
        required: true,
        message: i18next.t('User.fields.second_surname.rules.required'),
      },
      ...TextWhiteSpaceAndLenRule({
        maxLen: CharacterLimit.max.name,
        field: i18next.t('User.fields.second_surname.label'),
      }),
    ] as Rule[],
    gender: [
      {
        required: true,
        message: i18next.t('User.fields.gender.rules.required'),
      },
      {
        enum: ['Masculino', 'Femenino'],
      },
    ] as Rule[],
    address: [
      {
        required: true,
        message: i18next.t('User.fields.address.rules.required'),
      },
      ...TextWhiteSpaceAndLenRule({
        minLen: CharacterLimit.min.descriptions,
        maxLen: CharacterLimit.max.descriptions,
        field: i18next.t('User.fields.address.label'),
      }),
    ] as Rule[],
    birthday: [
      {
        required: true,
        message: i18next.t('User.fields.birthday.rules.required'),
      },
    ] as Rule[],
    gradeOfTea: [
      {
        required: true,
        message: i18next.t('User.fields.grade_of_tea.rules.required'),
      },
    ] as Rule[],
    phase: [
      {
        required: true,
        message: i18next.t('User.fields.phase.rules.required'),
      },
    ] as Rule[],
    tutorInCharge: [
      {
        required: true,
        message: i18next.t('User.fields.tutor_in_charge.rules.required'),
      },
    ] as Rule[],
    observations: [
      {
        required: true,
        message: i18next.t('User.fields.observations.rules.required'),
      },
      ...TextWhiteSpaceAndLenRule({
        minLen: CharacterLimit.min.descriptions,
        maxLen: CharacterLimit.max.descriptions,
        field: i18next.t('User.fields.observations.label'),
      }),
    ] as Rule[],
    identification: [
      {
        required: true,
        message: i18next.t('User.fields.identification.rules.required'),
      },
      ...CommonRules.identification,
    ] as Rule[],
    phoneNumber: [
      {
        required: true,
        message: i18next.t('User.fields.phone_number.rules.required'),
      },
      ...CommonRules.mobile,
    ] as Rule[],
    telephone: [
      {
        required: true,
        message: i18next.t('User.fields.telephone.rules.required'),
      },
      ...CommonRules.landline,
    ] as Rule[],
    image_url: [
      {
        required: true,
        message: i18next.t('User.fields.image_url.rules.required'),
      },
    ] as Rule[],
    username: [
      {
        required: true,
        message: i18next.t('User.fields.username.rules.required'),
      },
      ...CommonRules.username,
    ] as Rule[],
    email: [
      {
        required: true,
        message: i18next.t('User.fields.email.rules.required'),
      },
      ...CommonRules.email,
    ] as Rule[],
  },
} as const;
