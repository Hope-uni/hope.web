import i18next from '@/i18n';
import { Rule } from 'antd/lib/form';
import { CharacterLimit, RegexRules } from './common';

export const AuthRules = {
  emailOrUsername: [
    {
      required: true,
      message: i18next.t('Auth.fields.email_or_username.rules.required'),
    },
    {
      validator: async (_, value) => {
        if (!value) {
          return Promise.reject();
        }

        if (
          RegexRules.emailRegex.test(value) ||
          value.length > CharacterLimit.min.default
        ) {
          return Promise.resolve();
        }

        return Promise.reject(
          i18next.t('Auth.fields.email_or_username.rules.validator'),
        );
      },
    },
  ] as Rule[],
  password: [
    {
      required: true,
      message: i18next.t('Auth.fields.password.rules.required'),
    },
    {
      min: 3,
      message: i18next.t('Auth.fields.password.rules.min'),
    },
  ] as Rule[],
  confirmPassword: [
    {
      required: true,
      message: i18next.t('Auth.fields.password.rules.required'),
    },
    {
      min: 3,
      message: i18next.t('Auth.fields.password.rules.min'),
    },
  ] as Rule[],
  currentPassword: [
    {
      required: true,
      message: i18next.t('Auth.fields.current_password.rules.required'),
    },
    {
      min: 3,
      message: i18next.t('Auth.fields.current_password.rules.min'),
    },
  ] as Rule[],
  newPassword: [
    {
      required: true,
      message: i18next.t('Auth.fields.new_password.rules.required'),
    },
    {
      min: 3,
      message: i18next.t('Auth.fields.new_password.rules.min'),
    },
  ] as Rule[],
  confirmNewPassword: [
    {
      required: true,
      message: i18next.t('Auth.fields.confirm_new_password.rules.required'),
    },
    {
      min: 3,
      message: i18next.t('Auth.fields.confirm_new_password.rules.min'),
    },
  ] as Rule[],
} as const;
