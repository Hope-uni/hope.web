'use client';

import { HeaderForm } from '@/components/auth/HeaderForm';
import { Rules } from '@/constants/rules';
import { Link, useRouter } from '@/intl-navigation';
import styles from '@/styles/modules/auth.module.scss';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useTranslations } from 'next-intl';

export const LoginForm = () => {
  const router = useRouter();
  const t = useTranslations('_.Auth');

  const handleOnFinish = () => {
    router.push('/admin');
  };

  return (
    <Form
      name="auth_login"
      id="auth_form_antd"
      className={styles.auth_form}
      initialValues={{ remember: true }}
      onFinish={handleOnFinish}
    >
      <HeaderForm title={t('form.login.title')} />

      <FormItem
        name="email"
        className={styles.auth_form_input}
        rules={Rules.login.email}
      >
        <Input placeholder={t('fields.email.placeholder')} />
      </FormItem>

      <div className="w-100">
        <FormItem
          name="password"
          className={styles.auth_form_input}
          rules={Rules.login.password}
        >
          <Input
            type="password"
            placeholder={t('fields.password.placeholder')}
          />
        </FormItem>
        <FormItem>
          <Link
            href="/login/forgot-password"
            className={styles.auth_form_link_forgot}
          >
            {t('form.forgot_password_link')}
          </Link>
        </FormItem>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className={styles.auth_form_submit}
      >
        {t('form.submit')}
      </Button>
    </Form>
  );
};
