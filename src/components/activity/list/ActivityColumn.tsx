import React, { useCallback } from 'react';
import { TableProps } from 'antd';
import { Activity } from '@/models/schema';
import PopupActions from '@/components/table/PopupActions';
import { useTranslation } from 'react-i18next';

export const useActivityColumns = () => {
  const { t } = useTranslation();

  const handleEdit = useCallback((id: number) => {
    //TODO se abrirá un modal para editar
  }, []);

  const columns: TableProps<Activity>['columns'] = [
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
      width: '150px',
    },
    {
      title: t('Activity.index.columns.points'),
      dataIndex: 'points',
      align: 'center',
      width: '150px',
    },
    {
      title: t('Activity.index.columns.phase'),
      dataIndex: 'teaPhase',
      align: 'center',
      width: '150px',
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      className: 'td-actions',
      render: (_, { id }) => {
        return (
          <PopupActions
            id={id}
            actions={['edit', 'delete']}
            route="activities"
            onEdit={() => handleEdit(id)}
          />
        );
      },
    },
  ];

  return [columns];
};
