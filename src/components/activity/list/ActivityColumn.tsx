import { SingleActivity } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import ActionsActions from './ActivityActions';
import ActivityRowCardMobile from './ActivityRowCardMobile';

export const useActivityColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<SingleActivity>['columns'] = [
    {
      title: t('Activity.index.columns.name'),
      dataIndex: 'name',
      align: 'left',
      width: '200px',
    },
    {
      title: t('Activity.index.columns.description'),
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: t('Activity.index.columns.assignments'),
      dataIndex: 'assignments',
      align: 'center',
      width: '130px',
      render: (_, { assignments }) => {
        return <span>{assignments?.length || 0}</span>;
      },
    },
    {
      title: t('Activity.index.columns.points'),
      dataIndex: 'satisfactoryPoints',
      align: 'center',
      width: '100px',
    },
    {
      title: t('Activity.index.columns.phase'),
      dataIndex: 'phase',
      align: 'center',
      render: (_, { phase }) => {
        return <span>{phase.name}</span>;
      },
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      className: 'td-actions',
      render: (_, activity) => {
        return <ActionsActions activity={activity} />;
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, activity) => {
        return <ActivityRowCardMobile activity={activity} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
