import i18n from '@/i18n';

export interface StepFormInterface {
  step: '1' | '2' | '3';
  title: string;
  titleForm: string;
  description: string;
}

export const stepsData: StepFormInterface[] = [
  {
    step: '1',
    title: i18n.t('User.form.create.steps.step_1.title'),
    titleForm: i18n.t('User.form.create.steps.step_1.titleForm'),
    description: i18n.t('User.form.create.steps.step_1.description'),
  },
  {
    step: '2',
    title: i18n.t('User.form.create.steps.step_2.title'),
    titleForm: i18n.t('User.form.create.steps.step_2.titleForm'),
    description: i18n.t('User.form.create.steps.step_2.description'),
  },
  {
    step: '3',
    title: i18n.t('User.form.create.steps.step_3.title'),
    titleForm: i18n.t('User.form.create.steps.step_3.titleForm'),
    description: i18n.t('User.form.create.steps.step_3.description'),
  },
];

export const Genders = [
  {
    label: i18n.t('Gender.catalog.masculine'),
    value: 'Masculino',
  },
  {
    label: i18n.t('Gender.catalog.female'),
    value: 'Femenino',
  },
];
