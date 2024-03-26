import { Rules } from '@/constants/rules';
import { Form, Input, Radio } from 'antd';
import { useTranslations } from 'next-intl';
import styles from '@/styles/modules/user.module.scss';

interface Props {
  selectedRole: string;
}

const inputVisibleByRole = {
  birthday: ['patient'],
  gradeOfTea: ['patient'],
  phase: ['patient'],
  tutorInCharge: ['patient'],
  observations: ['patient'],
  identification: ['therapist', 'tutor'],
  phoneNumber: ['therapist', 'tutor'],
  telephone: ['therapist', 'tutor'],
};

export default function PersonDataSpecificForm({ selectedRole }: Props) {
  const t = useTranslations('_.User.fields');

  console.log(selectedRole);

  return (
    <Form
      name="create_login"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
    >
      {inputVisibleByRole.birthday.includes(selectedRole) && (
        <Form.Item name="bithday" label={t('birthday.label')}>
          <Input placeholder={t('birthday.placeholder')} />
        </Form.Item>
      )}

      {inputVisibleByRole.gradeOfTea.includes(selectedRole) && (
        <Form.Item name="gradeOfTea" label={t('grade_of_tea.label')}>
          <Input placeholder={t('grade_of_tea.placeholder')} />
        </Form.Item>
      )}

      {inputVisibleByRole.phase.includes(selectedRole) && (
        <Form.Item name="bithday" label={t('phase.label')}>
          <Input placeholder={t('phase.placeholder')} />
        </Form.Item>
      )}

      {inputVisibleByRole.tutorInCharge.includes(selectedRole) && (
        <Form.Item name="bithday" label={t('tutor_in_charge.label')}>
          <Input placeholder={t('tutor_in_charge.placeholder')} />
        </Form.Item>
      )}

      {inputVisibleByRole.observations.includes(selectedRole) && (
        <Form.Item name="bithday" label={t('observations.label')}>
          <Input placeholder={t('observations.placeholder')} />
        </Form.Item>
      )}

      {inputVisibleByRole.identification.includes(selectedRole) && (
        <Form.Item name="bithday" label={t('identification.label')}>
          <Input placeholder={t('identification.placeholder')} />
        </Form.Item>
      )}

      {inputVisibleByRole.phoneNumber.includes(selectedRole) && (
        <Form.Item name="bithday" label={t('phone_number.label')}>
          <Input placeholder={t('phone_number.placeholder')} />
        </Form.Item>
      )}

      {inputVisibleByRole.telephone.includes(selectedRole) && (
        <Form.Item name="bithday" label={t('telephone.label')}>
          <Input placeholder={t('telephone.placeholder')} />
        </Form.Item>
      )}
    </Form>
  );
}
