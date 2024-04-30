import React, { useCallback } from 'react';
import { TableProps, Tag } from 'antd';
import { Patient } from '@/models/schema';
import PopupActions from '@/components/table/PopupActions';
import { useRouter } from '@/intl-navigation';
import { useTranslations } from 'next-intl';

export const usePatientColumns = () => {
  const router = useRouter();
  const t = useTranslations('_.Patient.index');

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/patients/edit/${id}`);
    },
    [router],
  );

  const columns: TableProps<Patient>['columns'] = [
    {
      title: t('columns.name'),
      dataIndex: 'fullName',
      align: 'left',
    },
    {
      title: t('columns.age'),
      dataIndex: 'age',
      align: 'center',
      width: '200px',
    },
    {
      title: t('columns.grade'),
      dataIndex: 'teaGrade',
      align: 'center',
      width: '200px',
    },
    {
      title: t('columns.phase'),
      dataIndex: 'teaPhase',
      align: 'center',
      width: '200px',
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, { id }) => {
        return (
          <PopupActions
            id={id}
            actions={['show', 'edit', 'delete']}
            route="patients"
            onEdit={() => handleEdit(id)}
          />
        );
      },
    },
  ];

  return [columns];
};
