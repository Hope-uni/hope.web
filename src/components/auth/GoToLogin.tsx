'use client';

import { Link } from '@/intl-navigation';
import styles from '@/styles/modules/auth.module.scss';
import { useTranslations } from 'next-intl';

export const GoToLogin = () => {
  const t = useTranslations('_.Auth');

  return (
    <div className={styles.auth_form_link_back_row}>
      <p className={styles.auth_form_already_have_account}>
        {t('form.go_back_to')}
      </p>
      <Link href="/login" className={styles.auth_form_link_back}>
        {t('form.login_link')}
      </Link>
    </div>
  );
};
