import { notification, NotificationArgsProps } from 'antd';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsXLg } from 'react-icons/bs';
import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleInfo,
  FaCircleXmark,
} from 'react-icons/fa6';

interface Props {
  children: ReactNode;
}

interface NotificationContent {
  message?: string;
  description: string;
}

const ConfigNotification = {
  className: 'primary-notification',
  placement: 'topRight' as const,
  duration: null,
  closeIcon: <BsXLg />,
};

interface NotificationContextType {
  openNotification: {
    info: (content: NotificationContent) => void;
    success: (content: NotificationContent) => void;
    warning: (content: NotificationContent) => void;
    error: (content: NotificationContent) => void;
  };
}

export const NotificationContext = createContext<NotificationContextType>({
  openNotification: {
    info: () => {},
    success: () => {},
    warning: () => {},
    error: () => {},
  },
});

export const NotificationProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useMemo(
    () => ({
      info: ({ message, description }: NotificationContent) => {
        api.info({
          message: message || t('feedback.notification.info.messageDefault'),
          description,
          icon: <FaCircleInfo />,
          ...ConfigNotification,
        } as NotificationArgsProps);
      },
      success: ({ message, description }: NotificationContent) => {
        api.success({
          message: message || t('feedback.notification.success.messageDefault'),
          description,
          icon: <FaCircleCheck />,
          ...ConfigNotification,
        } as NotificationArgsProps);
      },
      warning: ({ message, description }: NotificationContent) => {
        api.warning({
          message: message || t('feedback.notification.warning.messageDefault'),
          description,
          icon: <FaCircleExclamation />,
          ...ConfigNotification,
        } as NotificationArgsProps);
      },
      error: ({ message, description }: NotificationContent) => {
        api.error({
          message: message || t('feedback.notification.error.messageDefault'),
          description,
          icon: <FaCircleXmark />,
          ...ConfigNotification,
        } as NotificationArgsProps);
      },
    }),
    [api, t],
  );

  const sharedState = useMemo(() => {
    return {
      openNotification,
    };
  }, [openNotification]);

  return (
    <NotificationContext.Provider value={sharedState}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useOpenNotification = () => useContext(NotificationContext);
