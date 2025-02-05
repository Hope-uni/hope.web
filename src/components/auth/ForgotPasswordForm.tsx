'use client';

import { GoToLogin } from '@/components/auth/GoToLogin';
import { HeaderForm } from '@/components/auth/HeaderForm';
import { AuthRules } from '@/constants/rules';
import { AlertType } from '@/models/types/antd';
import { ForgotPasswordService } from '@/services/auth/auth.service';
import styles from '@/styles/modules/auth.module.scss';
import { Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordFormValues {
  emailOrUsername: string;
}

export const ForgotPasswordForm = () => {
  const [error, setError] = useState<AlertType>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleOnFinish = async (values: ForgotPasswordFormValues) => {
    try {
      setLoading(true);
      setError(undefined);

      const res = await ForgotPasswordService({
        email_username: values.emailOrUsername,
      });

      setError(res.error ? 'error' : 'success');
      setMessage(res.message);
    } catch (error) {
      setError('error');
      setMessage(t('Status.unexpected_error'));
    } finally {
      setLoading(false);
    }
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

      {error && <Alert message={message} type={error} showIcon />}

      <Form.Item name="emailOrUsername" rules={AuthRules.emailOrUsername}>
        <Input placeholder={t('Auth.fields.email_or_username.placeholder')} />
      </Form.Item>

      <Form.Item className={styles.rowCenter}>
        <br />
        <Button
          type="primary"
          htmlType="submit"
          className={styles.auth_form_submit}
          loading={loading}
        >
          {t('Auth.form.send')}
        </Button>
        <GoToLogin />
      </Form.Item>
    </Form>
  );
};
