'use client';

import { HeaderForm } from '@/components/auth/HeaderForm';
import { DEFAULT_REDIRECT_HOME_URL } from '@/constants';
import { AuthRules } from '@/constants/rules';
import { AlertType } from '@/models/types/antd';
import styles from '@/styles/modules/auth.module.scss';
import { Alert, Button, Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputPassword from '../common/Inputs/InputPassword';

interface LoginFormValues {
  email_username: string;
  password: string;
}

export const LoginForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<AlertType>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      setMessage('');
      setError(undefined);

      const res = await signIn('credentials', {
        ...values,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === 'unauthorized') {
          setError('info');
          setMessage(t('Auth.errors.unauthorized'));
        } else {
          setError('error');
          setMessage(res?.error);
        }

        setLoading(false);
        return;
      }

      const callbackUrl = searchParams.get('callbackUrl');

      if (callbackUrl && callbackUrl.trim() !== '') {
        router.push(callbackUrl);
      } else {
        router.push(DEFAULT_REDIRECT_HOME_URL);
      }
    } catch (error) {
      setMessage('Something wrong');
      setError('error');
      setLoading(false);
    }
  };

  return (
    <Form
      name="auth_login"
      id="auth_form_antd"
      className={styles.auth_form}
      onFinish={handleOnFinish}
    >
      <HeaderForm title={t('Auth.form.login.title')} />
      {error && <Alert message={message} type={error} showIcon />}
      <FormItem
        name="email_username"
        className={styles.auth_form_input}
        rules={AuthRules.emailOrUsername}
      >
        <Input placeholder={t('Auth.fields.email_or_username.placeholder')} />
      </FormItem>
      <div className="w-100">
        <InputPassword
          name="password"
          className={styles.auth_form_input}
          rules={AuthRules.password}
          placeholderInput={t('Auth.fields.password.placeholder')}
          showWarningOnCapsLock
        />
        <Link href="/forgot-password" className={styles.auth_form_link_forgot}>
          {t('Auth.form.forgot_password_link')}
        </Link>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.auth_form_submit}
        loading={loading}
      >
        {t('Auth.form.submit')}
      </Button>
    </Form>
  );
};
