import { Rule } from 'antd/es/form';
import i18next from 'i18next';

export const CharacterLimit = {
  name: 100,
  descriptions: 255,
};

export const RegexRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  usernameRegex: /^[a-zA-Z0-9]{3,16}$/,
  identificationRegex:
    /^[0-9]{3}-(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])([0-9]{2})-[0-9]{4}[A-Z]$/,
  phoneRegex: {
    numeric: /^\d+$/,
    startWith_mobile: /^[5-8]/,
    startWith_landline: /^2/,
    length: /^\d{8}$/,
  },
  positiveInteger: /^[1-9]\d*$/,
  isMobile: /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i,
  textSpaces: {
    noDoubleSpaces: /^(?!.*\s{2}).*$/,
    whitespace: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    onlySpaces: /^\s+$/,
  },
};

const validatorPhone = (value: any, type: 'mobile' | 'landline') => {
  if (!value) return Promise.resolve();

  if (!RegexRules.phoneRegex.numeric.test(value)) {
    return Promise.reject(
      new Error(
        `${i18next.t('common.form.fields.phone.rules.base')} ${i18next.t('common.form.fields.phone.rules.numeric')}`,
      ),
    );
  }

  if (
    type === 'mobile' &&
    !RegexRules.phoneRegex.startWith_mobile.test(value)
  ) {
    return Promise.reject(
      new Error(
        `${i18next.t('common.form.fields.phone.rules.base')} ${i18next.t('common.form.fields.mobile.rules.startWith')}`,
      ),
    );
  }

  if (
    type === 'landline' &&
    !RegexRules.phoneRegex.startWith_landline.test(value)
  ) {
    return Promise.reject(
      new Error(
        `${i18next.t('common.form.fields.phone.rules.base')} ${i18next.t('common.form.fields.landline.rules.startWith')}`,
      ),
    );
  }

  if (!RegexRules.phoneRegex.length.test(value)) {
    return Promise.reject(
      new Error(
        `${i18next.t('common.form.fields.phone.rules.base')} ${i18next.t('common.form.fields.phone.rules.length')}`,
      ),
    );
  }

  return Promise.resolve();
};

const validatorWhiteSpaces = (value: any) => {
  if (RegexRules.textSpaces.onlySpaces.test(value)) {
    return Promise.reject(i18next.t('common.form.rules.whitespace'));
  }

  if (value && !RegexRules.textSpaces.noDoubleSpaces.test(value)) {
    return Promise.reject(
      i18next.t('common.form.rules.only_spaces_between_words'),
    );
  }

  return Promise.resolve();
};

export const CommonRules = {
  username: [
    {
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        if (RegexRules.usernameRegex.test(value)) {
          return Promise.resolve();
        }

        return Promise.reject(
          i18next.t('common.form.fields.username.rules.pattern'),
        );
      },
    },
  ] as Rule[],
  email: [
    {
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        if (RegexRules.emailRegex.test(value)) {
          return Promise.resolve();
        }

        return Promise.reject(
          i18next.t('common.form.fields.email.rules.pattern'),
        );
      },
    },
  ] as Rule[],
  identification: [
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve();

        if (!RegexRules.identificationRegex.test(value)) {
          return Promise.reject(
            new Error(
              i18next.t('common.form.fields.identification.rules.pattern'),
            ),
          );
        }

        return Promise.resolve();
      },
    },
  ] as Rule[],
  mobile: [
    {
      validator: (_, value) => {
        return validatorPhone(value, 'mobile');
      },
    },
  ] as Rule[],
  landline: [
    {
      validator: (_, value) => {
        return validatorPhone(value, 'landline');
      },
    },
  ] as Rule[],
  textWhiteSpace: [
    {
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        return validatorWhiteSpaces(value);
      },
    },
  ] as Rule[],
};

export const TextWhiteSpaceWithMaxLenRule = (maxLen: number) => {
  return [
    {
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        if (value.length > maxLen) {
          return Promise.reject(
            i18next.t('common.form.rules.max_len', {
              field: i18next.t('Activity.fields.description.label'),
              limit: maxLen,
            }),
          );
        }

        return validatorWhiteSpaces(value);
      },
    },
  ] as Rule[];
};

export const validateDeviceUserIsMobile = () => {
  return RegexRules.isMobile.test(navigator.userAgent);
};
