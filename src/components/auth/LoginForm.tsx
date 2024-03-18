'use client';

import styles from '@/styles/modules/auth.module.scss';
import { Button, Col, Form, Input, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { HeaderForm } from '@/components/auth/HeaderForm';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '../../navigation';

export const LoginForm = () => {
  const router = useRouter();
  const t = useTranslations('Auth');

  const handleOnFinish = () => {
    router.push('/admin');
  };

  return (
    <Form
      name="auth_login"
      id="auth_form_antd"
      className={styles.auth_form}
      initialValues={{ remember: true }}
      onFinish={handleOnFinish}>
      <HeaderForm title={t('form.login.title')} />

      <FormItem
        name="email"
        className={styles.auth_form_input}
        rules={[
          {
            required: true,
            message: t('fields.email.rules.required'),
          },
        ]}>
        <Input placeholder={t('fields.email.Placeholder')} />
      </FormItem>

      <div className="w-100">
        <FormItem
          name="password"
          className={styles.auth_form_input}
          rules={[
            {
              required: true,
              message: t('fields.password.rules.required'),
            },
          ]}>
          <Input
            type="password"
            placeholder={t('fields.password.Placeholder')}
          />
        </FormItem>
        <FormItem>
          <Link
            href="/login/forgot-password"
            className={styles.auth_form_link_forgot}>
            {t('fields.forgot_password')}
          </Link>
        </FormItem>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className={styles.auth_form_submit}>
        {t('fields.submit')}
      </Button>
    </Form>
  );
};
