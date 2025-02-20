import { UnassignedTag } from '@/components/common';
import RoleRowCardMobile from '@/components/role/list/RoleRowCardMobile';
import { ListRoleResponse } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
import { Flex, TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

export const useRoleColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<ListRoleResponse>['columns'] = [
    {
      title: t('Role.index.columns.name'),
      dataIndex: 'name',
      align: 'left',
      width: '300px',
    },
    {
      title: t('Role.index.columns.permission'),
      dataIndex: 'id',
      render: (_, { permissions }) => {
        if (permissions.length === 0) {
          return <UnassignedTag />;
        }

        return (
          <Flex gap={10} wrap>
            {permissions.map((item) => (
              <Tag key={item.id} className="tag-permission">
                {item.description}
              </Tag>
            ))}
          </Flex>
        );
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, role) => {
        return <RoleRowCardMobile role={role} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
