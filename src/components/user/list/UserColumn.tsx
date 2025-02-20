import { UnassignedTag } from '@/components/common';
import UserActions from '@/components/user/list/UserActions';
import UserRowCardMobile from '@/components/user/list/UserRowCardMobile';
import { ROLES } from '@/constants/Role';
import { SingleUser, Role } from '@/models/schema';
import { validateRole } from '@/utils/session';
import { addResponsiveProperty } from '@/utils/table';
import { StarFilled } from '@ant-design/icons';
import { TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

export const useUserColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<SingleUser>['columns'] = [
    {
      title: t('User.index.columns.email'),
      dataIndex: 'email',
      align: 'left',
    },
    {
      title: t('User.index.columns.user'),
      dataIndex: 'username',
      align: 'center',
      width: '280px',
      render: (_, { username }) => <span>@{username}</span>,
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
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, user) => {
        return <UserActions user={user} />;
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, user) => {
        return <UserRowCardMobile user={user} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
