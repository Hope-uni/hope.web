import { UnassignedTag, UserVerifiedTag } from '@/components/common';
import UserActions from '@/components/user/list/UserActions';
import UserRowCardMobile from '@/components/user/list/UserRowCardMobile';
import { ROLES } from '@/constants/guards';
import { Role, SingleUser } from '@/models/schema';
import { validateRole } from '@/utils/session';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { StarFilled } from '@ant-design/icons';
import { TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import AvatarUserList from '@/components/user/list/AvatarUserList';

interface OptionsArgs {
  showActions?: boolean;
}

export const useUserColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

  const { t } = useTranslation();

  const columns: TableProps<SingleUser>['columns'] = [
    {
      title: t('User.index.columns.user'),
      dataIndex: 'email',
      render: (_, { email, imageUrl, username }) => (
        <AvatarUserList image={imageUrl} title={username} description={email} />
      ),
    },
    {
      title: t('User.index.columns.status'),
      dataIndex: 'username',
      align: 'center',
      render: (_, { isVerified }) => (
        <UserVerifiedTag isVerified={isVerified} />
      ),
    },
    {
      title: t('User.index.columns.role'),
      dataIndex: 'role',
      align: 'center',
      width: '280px',
      className: 'table-cell-center',
      render: (_, { roles }) => {
        const roleData = roles?.length > 0 ? roles[0] : ({} as Role);

        if (!roleData.name) {
          return <UnassignedTag />;
        }

        if (validateRole(roleData.name, ROLES.ADMIN)) {
          return (
            <div>
              <Tag className="tag-role tag-role-admin">
                <StarFilled width={10} /> {roleData.name}
              </Tag>
            </div>
          );
        }

        return <Tag className="tag-role">{roleData.name}</Tag>;
      },
    },
  ];

  if (showActions) {
    columns.push(
      createActionColumn({
        customRender: (record) => <UserActions user={record} />,
      }),
    );
  }

  columns.push(
    createRowCardMobileColumn({
      customRender: (record) => (
        <UserRowCardMobile user={record} showActions={showActions} />
      ),
    }),
  );

  return [addResponsiveProperty(columns)];
};
