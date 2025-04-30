'use client';

import { HeaderForm } from '@/components/auth/HeaderForm';
import { InputPassword } from '@/components/common/Inputs';
import { AuthRules } from '@/constants/rules';
import useLogout from '@/hooks/useLogout';
import { ChangePasswordService } from '@/services/auth/auth.service';
import styles from '@/styles/modules/auth.module.scss';
import { Alert, Button, Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChangePasswordFormValues {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ChangePasswordForm = () => {
  const [error, setError] = useState<
    'info' | 'error' | 'success' | 'warning' | undefined
  >();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { logout } = useLogout();

  const handleOnFinish = async (values: ChangePasswordFormValues) => {
    try {
      setLoading(true);
      setError(undefined);

      const res = await ChangePasswordService({
        password: values.password,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });

      if (res?.error) {
        setError('error');
        setMessage(res?.message);
        setLoading(false);
        return;
      }

      setError('success');
      setMessage(`${res?.message}. ${t('Auth.form.redirectToLogin')}`);
      setTimeout(async () => {
        await handleLogout();
      }, 2000);
    } catch (error) {
      setError('error');
      setMessage(t('Status.unexpected_error'));
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Form
      name="auth_change_password"
      id="auth_form_antd"
      className={styles.auth_form}
      autoComplete="off"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={handleOnFinish}
      disabled={loading}
    >
      <HeaderForm
        title={t('Auth.form.reset_password.title')}
        caption={t('Auth.form.reset_password.caption')}
        space="10px 0 5px 0"
      />

      {error && <Alert message={message} type={error} showIcon />}

      <InputPassword
        name="password"
        className={styles.auth_form_input}
        rules={AuthRules.password}
        placeholderInput={t('Auth.fields.current_password.placeholder')}
        showWarningOnCapsLock={false}
      />

      <InputPassword
        name="newPassword"
        className={styles.auth_form_input}
        rules={AuthRules.confirmPassword}
        placeholderInput={t('Auth.fields.new_password.placeholder')}
        showWarningOnCapsLock={false}
      />

      <InputPassword
        name="confirmNewPassword"
        className={styles.auth_form_input}
        rules={AuthRules.confirmPassword}
        placeholderInput={t('Auth.fields.confirm_new_password.placeholder')}
        showWarningOnCapsLock={false}
      />

      <div className={styles.row_footer_buttons}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.auth_form_submit}
          loading={loading}
        >
          {t('Auth.form.send')}
        </Button>
        <Button
          type="primary"
          className={styles.auth_change_password_button_outlined}
          variant="outlined"
          onClick={() => handleLogout()}
        >
          {t('Auth.form.exit')}
        </Button>
      </div>
    </Form>
  );
};
