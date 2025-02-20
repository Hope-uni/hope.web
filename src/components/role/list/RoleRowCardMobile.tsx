import { UnassignedTag } from '@/components/common';
import { ListRoleResponse } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import { Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  role: ListRoleResponse;
}

const RoleRowCardMobile = ({ role }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.role_row_card_mobile}>
      <Flex vertical gap="10px">
        <Flex gap={5} align="center">
          <span className={styles.text_label}>
            {t('Role.index.columns.name')}:
          </span>
          <span className={styles.text_value}>{role.name}</span>
        </Flex>
        <Flex vertical gap={10}>
          <span className={styles.text_label}>
            {t('Role.index.columns.permission')}:
          </span>
          <div>
            {role.permissions.length === 0 ? (
              <UnassignedTag />
            ) : (
              <Flex gap={8} wrap>
                {role.permissions.map((item) => (
                  <Tag key={item.id} className="tag-permission">
                    {item.description}
                  </Tag>
                ))}
              </Flex>
            )}
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default RoleRowCardMobile;
