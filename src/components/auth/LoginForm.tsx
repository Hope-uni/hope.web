'use client';

import { HeaderForm } from '@/components/auth/HeaderForm';
import { Rules } from '@/constants/rules';
import { Link } from '@/intl-navigation';
import styles from '@/styles/modules/auth.module.scss';
import { Alert, Button, Form, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface LoginFormValues {
  email_username: string;
  password: string;
}

export const LoginForm = () => {
  const t = useTranslations('_.Auth');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      setError('');

      const res = await signIn('credentials', {
        ...values,
        redirect: false,
      });

      if (res?.error) {
        setError(res?.error);
      }

      console.log(res, 'res');
    } catch (error) {
      message.error('Something wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="auth_login"
      id="auth_form_antd"
      className={styles.auth_form}
      initialValues={{ email_username: 'sam', password: '1234678' }}
      onFinish={handleOnFinish}
    >
      <HeaderForm title={t('form.login.title')} />
      {error && <Alert message={error} type="error" showIcon />}
      <FormItem
        name="email_username"
        className={styles.auth_form_input}
        rules={Rules.auth.emailOrUsername}
      >
        <Input placeholder={t('fields.email_or_username.placeholder')} />
      </FormItem>
      <div className="w-100">
        <FormItem
          name="password"
          className={styles.auth_form_input}
          rules={Rules.auth.password}
        >
          <Input
            type="password"
            placeholder={t('fields.password.placeholder')}
          />
        </FormItem>
        <Link href="/forgot-password" className={styles.auth_form_link_forgot}>
          {t('form.forgot_password_link')}
        </Link>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.auth_form_submit}
        loading={loading}
      >
        {t('form.submit')}
      </Button>
    </Form>
  );
};
