import { NotificationContent } from '@/models/types';
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

interface LabelNotificationProps {
  message: string;
  icon: ReactNode;
  status: string;
}

const ConfigNotification = {
  className: 'primary-notification',
  placement: 'topRight' as const,
  duration: -1,
  closeIcon: <BsXLg />,
  icon: null,
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

const LabelNotification = ({
  message,
  icon,
  status,
}: LabelNotificationProps) => {
  return (
    <div className="ant-notification-notice-message-inner">
      <span
        role="img"
        aria-label={status}
        className="ant-notification-notice-icon-custom"
      >
        {icon}
      </span>
      {message}
    </div>
  );
};

export const NotificationProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useMemo(
    () => ({
      info: ({ message, description }: NotificationContent) => {
        api.info({
          message: (
            <LabelNotification
              message={
                message || t('feedback.notification.info.messageDefault')
              }
              icon={<FaCircleInfo />}
              status="info"
            />
          ),
          description,
          ...ConfigNotification,
        } as NotificationArgsProps);
      },
      success: ({ message, description }: NotificationContent) => {
        api.success({
          message: (
            <LabelNotification
              message={
                message || t('feedback.notification.success.messageDefault')
              }
              icon={<FaCircleCheck />}
              status="success"
            />
          ),
          description,
          ...ConfigNotification,
        } as NotificationArgsProps);
      },
      warning: ({ message, description }: NotificationContent) => {
        api.warning({
          message: (
            <LabelNotification
              message={
                message || t('feedback.notification.warning.messageDefault')
              }
              icon={<FaCircleExclamation />}
              status="warning"
            />
          ),
          description,
          ...ConfigNotification,
        } as NotificationArgsProps);
      },
      error: ({ message, description }: NotificationContent) => {
        api.error({
          message: (
            <LabelNotification
              message={
                message || t('feedback.notification.error.messageDefault')
              }
              icon={<FaCircleXmark />}
              status="error"
            />
          ),
          description,
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
