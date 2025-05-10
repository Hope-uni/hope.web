import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  isVerified?: boolean;
}

const UserVerifiedTag = ({ isVerified = false }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {isVerified ? (
        <Tag className="tag-user-verified">
          {t('User.feedback.tag.user_verified')}
        </Tag>
      ) : (
        <Tag className="tag-user-not-verified">
          {t('User.feedback.tag.user_not_verified')}
        </Tag>
      )}
    </>
  );
};

export default UserVerifiedTag;
