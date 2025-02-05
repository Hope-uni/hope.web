import PopupActions from '@/components/table/PopupActions';
import { ListUserResponse, Role } from '@/models/schema';
import { ActionType } from '@/models/types/Table';
import { addResponsiveProperty } from '@/utils/table';
import { StarFilled } from '@ant-design/icons';
import { TableProps, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import UserRowCardMobile from '@/components/user/list/UserRowCardMobile';

interface PropsActionUserPopup {
  user: ListUserResponse;
  handleAction: (id: string, pathModule: string) => void;
}

const ActionUserPopup = ({ user, handleAction }: PropsActionUserPopup) => {
  const roleData = user.roles?.length > 0 ? user.roles[0] : ({} as Role);
  const actionsUser: ActionType[] = ['show', 'edit', 'delete'];
  return (
    <PopupActions
      id={user.id}
      actions={actionsUser}
      route="users"
      onShow={() => handleAction(user.id, roleData.name)}
    />
  );
};

export const useUserColumns = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleShowDetail = useCallback(
    (id: string, pathModule: string) => {
      if (pathModule) {
        router.push(`/admin/${pathModule}/${id}`);
      }
    },
    [router],
  );

  const columns: TableProps<ListUserResponse>['columns'] = [
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
        if (roleData.name === 'Admin') {
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
        return <ActionUserPopup user={user} handleAction={handleShowDetail} />;
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, user) => {
        return (
          <UserRowCardMobile user={user} handleAction={handleShowDetail} />
        );
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
