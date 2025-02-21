import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  customLabel?: string;
}

const UnassignedTag = ({ customLabel }: Props) => {
  const { t } = useTranslation();

  return (
    <Tag className="tag-not-assignment">
      {customLabel || t('common.not_asignment')}
    </Tag>
  );
};

export default UnassignedTag;
