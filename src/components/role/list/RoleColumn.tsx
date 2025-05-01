import { UnassignedTag } from '@/components/common';
import RoleRowCardMobile from '@/components/role/list/RoleRowCardMobile';
import { ListRoleResponse } from '@/models/schema';
import {
  addResponsiveProperty,
  createRowCardMobileColumn,
} from '@/utils/table';
import { Flex, TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

export const useRoleColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<ListRoleResponse>['columns'] = [
    {
      title: t('Role.index.columns.name'),
      dataIndex: 'name',
      align: 'left',
      width: '80px',
    },
    {
      title: t('Role.index.columns.permission'),
      dataIndex: 'id',
      width: '300px',
      render: (_, { permissions }) => {
        if (permissions?.length === 0) {
          return <UnassignedTag />;
        }

        return (
          <Flex gap={10} wrap>
            {permissions.map((item) => (
              <Tag key={item.id} className="tag-permission">
                {item.name}
              </Tag>
            ))}
          </Flex>
        );
      },
    },
    createRowCardMobileColumn({
      customRender: (record) => <RoleRowCardMobile role={record} />,
    }),
  ];

  return [addResponsiveProperty(columns)];
};
