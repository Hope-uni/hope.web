import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

export default function Copy() {
  const t = useTranslations();

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
