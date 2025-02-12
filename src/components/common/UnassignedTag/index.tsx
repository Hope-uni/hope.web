import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

const UnassignedTag = () => {
  const { t } = useTranslation();

  return <Tag className="tag-not-assignment">{t('common.not_asignment')}</Tag>;
};

export default UnassignedTag;
