'use client';

import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';

const UnauthorizedPage = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="403"
      title="403"
      subTitle={t('feedback.result.user_unauthorized')}
    />
  );
};

export default UnauthorizedPage;
