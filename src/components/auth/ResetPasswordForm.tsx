'use client';

import { HeaderForm } from '@/components/auth/HeaderForm';
import { Rules } from '@/constants/rules';
import { Link, useRouter } from '@/intl-navigation';
import styles from '@/styles/modules/auth.module.scss';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useTranslations } from 'next-intl';
import { GoToLogin } from '@/components/auth/GoToLogin';

interface Props {
  token: string | null;
}

export const ResetPasswordForm = ({ token }: Props) => {
  const router = useRouter();
  const t = useTranslations('_.Auth');

  const handleOnFinish = () => {
    router.push('/login');
  };

  if (!token) {
    return (
      <div className={styles.auth_form}>
        <HeaderForm
          title={t('form.reset_password.title')}
          caption={t('form.reset_password.caption_no_token')}
          space="30px 0 25px 0"
        />
        <Button type="primary" style={{ marginTop: '2rem' }}>
          <Link href="/login">{t('form.login_link')}</Link>
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
        title={t('form.reset_password.title')}
        caption={t('form.reset_password.caption')}
        space="10px 0 5px 0"
      />

      <FormItem
        name="password"
        className={styles.auth_form_input}
        rules={Rules.resetPassword.password}
      >
        <Input type="password" placeholder={t('fields.password.Placeholder')} />
      </FormItem>

      <FormItem
        name="password"
        className={styles.auth_form_input}
        rules={Rules.resetPassword.confirmPassword}
      >
        <Input
          type="password"
          placeholder={t('fields.confirm_password.Placeholder')}
        />
      </FormItem>

      <Form.Item className={styles.rowCenter}>
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
