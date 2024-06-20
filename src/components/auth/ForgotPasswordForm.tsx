'use client';

import { GoToLogin } from '@/components/auth/GoToLogin';
import { HeaderForm } from '@/components/auth/HeaderForm';
import { Rules } from '@/constants/rules';
import { useRouter } from '@/intl-navigation';
import styles from '@/styles/modules/auth.module.scss';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const t = useTranslations('_.Auth');

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
        title={t('form.forgot_password.title')}
        caption={t('form.forgot_password.caption')}
      />

      <Form.Item name="emailOrUsername" rules={Rules.auth.emailOrUsername}>
        <Input placeholder={t('fields.email_or_username.placeholder')} />
      </Form.Item>

      <Form.Item className={styles.rowCenter}>
        <br />
        <Button
          type="primary"
          htmlType="submit"
          className={styles.auth_form_submit}
        >
          {t('form.send')}
        </Button>
        <GoToLogin />
      </Form.Item>
    </Form>
  );
};
