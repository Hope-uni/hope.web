import { UnassignedTag } from '@/components/common';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import TherapistRowCardMobile from '@/components/therapist/list/TherapistRowCardMobile';
import AvatarUserList from '@/components/user/list/AvatarUserList';
import { SingleTutorTherapist } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { TableProps } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface OptionsArgs {
  showActions?: boolean;
}

export const useTherapistColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

  const { t } = useTranslation();

  const columns: TableProps<SingleTutorTherapist>['columns'] = useMemo(() => {
    const cols: TableProps<SingleTutorTherapist>['columns'] = [
      {
        title: t('Therapist.index.columns.name'),
        dataIndex: 'fullName',
        width: 350,
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
        title: t('Therapist.index.columns.email'),
        dataIndex: 'email',
        align: 'left',
        width: 300,
      },
      {
        title: t('Therapist.index.columns.phone'),
        dataIndex: 'phoneNumber',
        align: 'left',
        width: 150,
      },
      {
        title: t('Therapist.index.columns.patientsInCharge'),
        dataIndex: 'patientsInCharge',
        align: 'center',
        width: 250,
        render: (_, { childrenInCharge }) => {
          if (!!(childrenInCharge && childrenInCharge > 0)) {
            return <span>{childrenInCharge}</span>;
          }

          return <UnassignedTag />;
        },
      },
    ];

    if (showActions) {
      cols.push(
        createActionColumn({
          customRender: (record) => <TherapistActions therapist={record} />,
        }),
      );
    }

    cols.push(
      createRowCardMobileColumn({
        customRender: (record) => (
          <TherapistRowCardMobile
            therapist={record}
            showActions={showActions}
          />
        ),
      }),
    );

    return cols;
  }, [showActions, t]);

  return [addResponsiveProperty(columns)];
};
