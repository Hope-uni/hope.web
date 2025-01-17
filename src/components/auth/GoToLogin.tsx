'use client';

import styles from '@/styles/modules/auth.module.scss';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const GoToLogin = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.auth_form_link_back_row}>
      <p className={styles.auth_form_already_have_account}>
        {t('Auth.form.go_back_to')}
      </p>
      <Link href="/login" className={styles.auth_form_link_back}>
        {t('Auth.form.login_link')}
      </Link>
    </div>
  );
};
