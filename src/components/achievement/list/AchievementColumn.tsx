import AchievementActions from '@/components/achievement/list/AchievementActions';
import AchievementRowCardMobile from '@/components/achievement/list/AchievementRowCardMobile';
import OptimizedImage from '@/components/common/OptimizedImage';
import { Achievement } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface OptionsArgs {
  showActions?: boolean;
}

export const useAchievementColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

  const { t } = useTranslation();

  const columns: TableProps<Achievement>['columns'] = [
    {
      title: t('Achievement.index.columns.image'),
      dataIndex: 'imageUrl',
      align: 'left',
      width: '250px',
      render: (_, { name, imageUrl }) => (
        <OptimizedImage srcImage={imageUrl} size={60} alt={name} />
      ),
    },
    {
      title: t('Achievement.index.columns.name'),
      dataIndex: 'name',
      align: 'left',
    },
  ];

  if (showActions) {
    columns.push(
      createActionColumn({
        customRender: (record) => <AchievementActions achievement={record} />,
      }),
    );
  }

  columns.push(
    createRowCardMobileColumn({
      customRender: (record) => (
        <AchievementRowCardMobile
          achievement={record}
          showActions={showActions}
        />
      ),
    }),
  );

  return [addResponsiveProperty(columns)];
};
