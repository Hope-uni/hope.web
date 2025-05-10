import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  isVerified: boolean;
}

const UserVerificationAlert = ({ isVerified }: Props) => {
  const { t } = useTranslation();

  if (isVerified) return null;

  return (
    <Alert
      type="error"
      showIcon
      message={t('common.note')}
      description={t('User.feedback.alerts.user_not_verified.description')}
      style={{
        marginBottom: 20,
      }}
    />
  );
};

export default UserVerificationAlert;
