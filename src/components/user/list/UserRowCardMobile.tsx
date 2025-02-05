import { ListUserResponse, Role } from '@/models/schema';
import { Flex, Tag } from 'antd';
import { StarFilled } from '@ant-design/icons';
import PopupActions from '@/components/table/PopupActions';
import { ActionType } from '@/models/types';
import styles from '@/styles/modules/user.module.scss';

const actionsUser: ActionType[] = ['show', 'edit', 'delete'];

interface Props {
  user: ListUserResponse;
  handleAction: (id: string, pathModule: string) => void;
}

const UserRowCardMobile = ({ user, handleAction }: Props) => {
  const roleData = user.roles?.length > 0 ? user.roles[0] : ({} as Role);

  return (
    <div className={styles.user_row_card_mobile}>
      <Flex vertical gap="10px">
        <div>
          {roleData.name === 'Admin' ? (
            <Tag className="tag-role tag-role-admin">
              <StarFilled width={10} /> {roleData.name}
            </Tag>
          ) : (
            <Tag className="tag-role">{roleData.name}</Tag>
          )}
        </div>
        <Flex vertical>
          <span className={styles.text_email}>{user.email}</span>
          <span className={styles.text_username}>@{user.username}</span>
        </Flex>
      </Flex>
      <div>
        <div className="table_popup_actions_mobile">
          <PopupActions
            id={user.id}
            actions={actionsUser}
            route="users"
            onShow={() => handleAction(user.id, roleData.name)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRowCardMobile;
