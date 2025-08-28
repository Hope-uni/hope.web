import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { API_RESPONSE } from '@/models/types';
import { useTranslation } from 'react-i18next';

export const useValidateServiceError = () => {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();

  const handleErrorService = (
    response: API_RESPONSE<any>,
    applyErrorsCallback: () => void,
  ) => {
    if (response.error) {
      if (
        response.statusCode !== 201 &&
        response.validationErrors &&
        Object.keys(response.validationErrors).length > 0
      ) {
        applyErrorsCallback();
      }

      if (response.statusCode === 500) {
        openNotification.error({
          message: t('feedback.message_error.processingRequestTitle'),
          description: response.message,
        });
      }
      return;
    }
  };

  return {
    handleErrorService,
  };
};
