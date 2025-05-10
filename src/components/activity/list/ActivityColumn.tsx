import { SingleActivity } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import ActivityRowCardMobile from '@/components/activity/list/ActivityRowCardMobile';
import ActivityActions from '@/components/activity/list/ActivityActions';

interface OptionsArgs {
  showActions?: boolean;
}

export const useActivityColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

  const { t } = useTranslation();

  const columns: TableProps<SingleActivity>['columns'] = [
    {
      title: t('Activity.index.columns.name'),
      dataIndex: 'name',
      align: 'left',
      width: '250px',
    },
    {
      title: t('Activity.index.columns.description'),
      dataIndex: 'description',
      align: 'left',
      width: '350px',
    },
    {
      title: t('Activity.index.columns.assignments'),
      dataIndex: 'assignments',
      align: 'center',
      width: '150px',
      render: (_, { assignments }) => {
        return <span>{assignments?.length || 0}</span>;
      },
    },
    {
      title: t('Activity.index.columns.points'),
      dataIndex: 'satisfactoryPoints',
      align: 'center',
      width: '150px',
    },
    {
      title: t('Activity.index.columns.phase'),
      dataIndex: 'phase',
      align: 'center',
      width: '250px',
      render: (_, { phase }) => {
        return <span>{phase.name}</span>;
      },
    },
  ];

  if (showActions) {
    columns.push(
      createActionColumn({
        customRender: (record) => <ActivityActions activity={record} />,
      }),
    );
  }

  columns.push(
    createRowCardMobileColumn({
      customRender: (record) => (
        <ActivityRowCardMobile activity={record} showActions={showActions} />
      ),
    }),
  );

  return [addResponsiveProperty(columns)];
};
