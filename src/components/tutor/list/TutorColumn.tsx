'use client';

import React, { useCallback } from 'react';
import { TableProps, Tag } from 'antd';
import { Tutor } from '@/models/schema/index';
import PopupActions from '@/components/table/PopupActions';
import { useRouter } from '@/intl-navigation';
import { useTranslations } from 'next-intl';

export const useTutorColumns = () => {
  const router = useRouter();
  const t = useTranslations('_.Tutor.index');

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/admin/users/edit/${id}`);
    },
    [router],
  );

  const columns: TableProps<Tutor>['columns'] = [
    {
      title: t('columns.name'),
      dataIndex: 'fullName',
      align: 'left',
    },
    {
      title: t('columns.email'),
      dataIndex: 'email',
      align: 'left',
    },
    {
      title: t('columns.phone'),
      dataIndex: 'phoneNumber',
      align: 'center',
      width: '200px',
    },
    {
      title: t('columns.telephone'),
      dataIndex: 'telephone',
      align: 'center',
      width: '200px',
    },
    {
      title: t('columns.patientsInCharge'),
      dataIndex: 'patientsInCharge',
      align: 'center',
      width: '150px',
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
            route="tutors"
            onEdit={() => handleEdit(id)}
          />
        );
      },
    },
  ];

  return [columns];
};
