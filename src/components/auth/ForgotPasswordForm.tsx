'use client';

import { GoToLogin } from '@/components/auth/GoToLogin';
import { HeaderForm } from '@/components/auth/HeaderForm';
import { Rules } from '@/constants/rules';
import styles from '@/styles/modules/auth.module.scss';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleOnFinish = () => {
    router.push('/login/reset-password?token=133');
  };

  return (
    <Form
      name="auth_forgot_password"
      id="auth_form_antd"
      className={styles.auth_form}
      autoComplete="off"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={handleOnFinish}
    >
      <HeaderForm
        title={t('Auth.form.forgot_password.title')}
        caption={t('Auth.form.forgot_password.caption')}
      />

      <Form.Item name="emailOrUsername" rules={Rules.auth.emailOrUsername}>
        <Input placeholder={t('Auth.fields.email_or_username.placeholder')} />
      </Form.Item>

      <Form.Item className={styles.rowCenter}>
        <br />
        <Button
          type="primary"
          htmlType="submit"
          className={styles.auth_form_submit}
        >
          {t('Auth.form.send')}
        </Button>
        <GoToLogin />
      </Form.Item>
    </Form>
  );
};
