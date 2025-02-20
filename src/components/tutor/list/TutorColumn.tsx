'use client';

import { UnassignedTag } from '@/components/common';
import TutorActions from '@/components/tutor/list/TutorActions';
import TutorRowCardMobile from '@/components/tutor/list/TutorRowCardMobile';
import { ListTutorResponse } from '@/models/schema/index';
import { addResponsiveProperty } from '@/utils/table';
import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const useTutorColumns = () => {
  const { t } = useTranslation();

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
      render: (_, { childrenInCharge }) => {
        if (!!(childrenInCharge && childrenInCharge > 0)) {
          return <span>{childrenInCharge}</span>;
        }

        return <UnassignedTag />;
      },
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, tutor) => {
        return <TutorActions tutor={tutor} />;
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
