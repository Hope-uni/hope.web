'use client';

import { GoToLogin } from '@/components/auth/GoToLogin';
import { HeaderForm } from '@/components/auth/HeaderForm';
import { AuthRules } from '@/constants/rules';
import { ResetPasswordService } from '@/services/auth/auth.service';
import styles from '@/styles/modules/auth.module.scss';
import { Button, Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';
import FormItem from 'antd/lib/form/FormItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface Props {
  token: string | null;
}

export const ResetPasswordForm = ({ token }: Props) => {
  const [error, setError] = useState<
    'info' | 'error' | 'success' | 'warning' | undefined
  >();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleOnFinish = async (values: ResetPasswordFormValues) => {
    try {
      setLoading(true);
      setError(undefined);

      const res = await ResetPasswordService({
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (res?.error) {
        setError('error');
        setMessage(res?.message);
        setLoading(false);
        return;
      }

      setError('success');
      setMessage(res?.message);
    } catch (error) {
      setError('error');
      setMessage(t('Status.unexpected_error'));
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.auth_form}>
        <HeaderForm
          title={t('Auth.form.reset_password.title')}
          caption={t('Auth.form.reset_password.caption_no_token')}
          space="30px 0 25px 0"
        />
        <Button type="primary" style={{ marginTop: '2rem' }}>
          <Link href="/login">{t('Auth.form.login_link')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <Form
      name="auth_reset_password"
      id="auth_form_antd"
      className={styles.auth_form}
      autoComplete="off"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={handleOnFinish}
    >
      <HeaderForm
        title={t('Auth.form.reset_password.title')}
        caption={t('Auth.form.reset_password.caption')}
        space="10px 0 5px 0"
      />

      <FormItem
        name="password"
        className={styles.auth_form_input}
        rules={AuthRules.password}
      >
        <Input.Password
          iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
          type="password"
          placeholder={t('Auth.fields.password.placeholder')}
        />
      </FormItem>

      <FormItem
        name="password"
        className={styles.auth_form_input}
        rules={AuthRules.confirmPassword}
      >
        <Input.Password
          iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
          type="password"
          placeholder={t('Auth.fields.confirm_password.placeholder')}
        />
      </FormItem>

      <Form.Item className={styles.rowCenter}>
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
