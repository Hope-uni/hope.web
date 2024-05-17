import React, { useCallback } from 'react';
import { TableProps } from 'antd';
import { Activity } from '@/models/schema';
import PopupActions from '@/components/table/PopupActions';
import { useRouter } from '@/intl-navigation';
import { useTranslations } from 'next-intl';

export const useActivityColumns = () => {
  const router = useRouter();
  const t = useTranslations('_.Activity.index');

  const handleEdit = useCallback(
    (id: number) => {
      //TODO se abrirá un modal para editar
    },
    [router],
  );

  const columns: TableProps<Activity>['columns'] = [
    {
      title: t('columns.name'),
      dataIndex: 'name',
      align: 'left',
      width: '200px',
    },
    {
      title: t('columns.description'),
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: t('columns.assignments'),
      dataIndex: 'assignments',
      align: 'center',
      width: '150px',
    },
    {
      title: t('columns.points'),
      dataIndex: 'points',
      align: 'center',
      width: '150px',
    },
    {
      title: t('columns.phase'),
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
