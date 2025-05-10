'use client';

import { UnassignedTag } from '@/components/common';
import TutorActions from '@/components/tutor/list/TutorActions';
import TutorRowCardMobile from '@/components/tutor/list/TutorRowCardMobile';
import AvatarUserList from '@/components/user/list/AvatarUserList';
import { SingleTutorTherapist } from '@/models/schema/index';
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

export const useTutorColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

  const { t } = useTranslation();

  const columns: TableProps<SingleTutorTherapist>['columns'] = [
    {
      title: t('Tutor.index.columns.name'),
      dataIndex: 'fullName',
      render: (_, { fullName, imageUrl, isVerified }) => (
        <AvatarUserList
          image={imageUrl}
          description={fullName}
          sizeImage={25}
          isVerified={isVerified}
          showTooltipVerified
        />
      ),
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
  ];

  if (showActions) {
    columns.push(
      createActionColumn({
        customRender: (record) => <TutorActions tutor={record} />,
      }),
    );
  }

  columns.push(
    createRowCardMobileColumn({
      customRender: (record) => (
        <TutorRowCardMobile tutor={record} showActions={showActions} />
      ),
    }),
  );

  return [addResponsiveProperty(columns)];
};
