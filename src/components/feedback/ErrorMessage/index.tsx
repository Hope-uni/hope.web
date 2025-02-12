import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  const { t } = useTranslation();
  return (
    <Result
      status="error"
      title={t('feedback.message_error.title')}
      subTitle={t('feedback.message_error.subtitle')}
    />
  );
};

export default ErrorMessage;
