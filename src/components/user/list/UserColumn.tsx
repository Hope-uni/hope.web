import React, { useCallback } from 'react';
import { TableProps, Tag } from 'antd';
import { User } from '@/models/schema';
import { StarFilled } from '@ant-design/icons';
import PopupActions from '@/components/table/PopupActions';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/intl-navigation';
import { ActionType } from '@/models/types/Table';

export const useUserColumns = () => {
  const router = useRouter();
  const t = useTranslations('_.User.index');

  const handleShowDetail = useCallback(
    (id: number, pathModule: string) => {
      if (pathModule) {
        router.push(`/admin/${pathModule}/${id}`);
      }
    },
    [router],
  );

  const columns: TableProps<User>['columns'] = [
    {
      title: t('columns.email'),
      dataIndex: 'email',
      align: 'left',
    },
    {
      title: t('columns.user'),
      dataIndex: 'username',
      align: 'center',
      width: '280px',
      render: (_, { username }) => <span>@{username}</span>,
    },
    {
      title: t('columns.role'),
      dataIndex: 'role',
      align: 'center',
      width: '280px',
      className: 'table-cell-center',
      render: (_, { role }) => {
        if (role.name === 'Admin') {
          return (
            <div>
              <Tag className="tag-role tag-role-admin">
                <StarFilled width={10} /> {role.name}
              </Tag>
            </div>
          );
        }

        return <Tag className="tag-role">{role.name}</Tag>;
      },
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, { id, role }) => {
        const actionsUser: ActionType[] =
          role.name !== 'Admin'
            ? ['show', 'edit', 'delete']
            : ['edit', 'delete'];
        return (
          <PopupActions
            id={id}
            actions={actionsUser}
            route="users"
            onShow={() => handleShowDetail(id, role.name)}
          />
        );
      },
    },
  ];

  return [columns];
};
