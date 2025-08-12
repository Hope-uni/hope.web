import OptimizedImage from '@/components/common/OptimizedImage';
import { Flex, Tooltip } from 'antd';
import styles from '@/styles/modules/user.module.scss';
import { MdError } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/constants/Theme';

interface Props {
  image?: string | null;
  sizeImage?: string | number;
  title?: string;
  description?: string;
  isVerified?: boolean;
  showTooltipVerified?: boolean;
}

const TooltipUserNotVerified = () => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('User.feedback.tag.user_not_verified')}>
      <MdError color={COLORS.error} />
    </Tooltip>
  );
};

const AvatarUserList = ({
  image,
  sizeImage = 40,
  title,
  description,
  isVerified,
  showTooltipVerified = false,
}: Props) => {
  return (
    <Flex gap={10} align="center" className={styles.avatar_user_list_wrapper}>
      <OptimizedImage srcImage={image} shape="circle" size={sizeImage} />
      <Flex vertical align="flex-start" justify="center">
        {title && (
          <Flex gap={5} align="center" justify="center">
            <span className={styles.avatar_user_list_title}>{title}</span>
          </Flex>
        )}
        {description && (
          <Flex gap={5} align="center" justify="center">
            <Flex>
              <span
                className="text-ellipse"
                style={{
                  width: '250px',
                }}
              >
                {description}
              </span>
            </Flex>
            {!isVerified && showTooltipVerified && <TooltipUserNotVerified />}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default AvatarUserList;
