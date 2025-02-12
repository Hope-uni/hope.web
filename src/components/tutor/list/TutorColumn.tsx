'use client';

import { UnassignedTag } from '@/components/common';
import PopupActions from '@/components/table/PopupActions';
import TutorRowCardMobile from '@/components/tutor/list/TutorRowCardMobile';
import { ListTutorResponse } from '@/models/schema/index';
import { addResponsiveProperty } from '@/utils/table';
import { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useTutorColumns = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/admin/users/edit/${id}`);
    },
    [router],
  );

  const columns: TableProps<ListTutorResponse>['columns'] = [
    {
      title: t('Tutor.index.columns.name'),
      dataIndex: 'fullName',
      align: 'left',
    },
    {
      title: t('Tutor.index.columns.phone'),
      dataIndex: 'phoneNumber',
      align: 'center',
      width: '200px',
    },
    {
      title: t('Tutor.index.columns.telephone'),
      dataIndex: 'telephone',
      align: 'center',
      width: '200px',
    },
    {
      title: t('Tutor.index.columns.patientsInCharge'),
      dataIndex: 'patientsInCharge',
      align: 'center',
      width: '150px',
      render: (_, { patientsInCharge }) => {
        if (!!(patientsInCharge && patientsInCharge > 0)) {
          return <span>{patientsInCharge}</span>;
        }

        return <UnassignedTag />;
      },
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
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, tutor) => {
        return <TutorRowCardMobile tutor={tutor} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
