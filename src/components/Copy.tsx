import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Copy() {
  const { t } = useTranslation();

  return (
    <footer>
      <small className="text_primary-black text_sz-8">
        {t('Copy', {
          year: new Date().getFullYear(),
        })}
      </small>
    </footer>
  );
}
