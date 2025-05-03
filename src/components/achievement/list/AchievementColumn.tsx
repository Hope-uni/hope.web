import AchievementRowCardMobile from '@/components/achievement/list/AchievementRowCardMobile';
import AchievementActions from '@/components/achievement/list/AchievementActions';
import { Achievement } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { Image, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const useAchievementColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<Achievement>['columns'] = [
    {
      title: t('Achievement.index.columns.image'),
      dataIndex: 'imageUrl',
      align: 'left',
      width: '250px',
      render: (_, { name, imageUrl }) => (
        <Image src={String(imageUrl)} width={60} height={60} alt={name} />
      ),
    },
    {
      title: t('Achievement.index.columns.name'),
      dataIndex: 'name',
      align: 'left',
    },
    createActionColumn({
      customRender: (record) => <AchievementActions achievement={record} />,
    }),
    createRowCardMobileColumn({
      customRender: (record) => (
        <AchievementRowCardMobile achievement={record} />
      ),
    }),
  ];

  return [addResponsiveProperty(columns)];
};
