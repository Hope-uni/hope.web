import { Show } from '@/components/Show';
import { UnassignedTag } from '@/components/common';
import UserActions from '@/components/user/list/UserActions';
import { SingleUser, Role } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import { StarFilled } from '@ant-design/icons';
import { Flex, Tag } from 'antd';

interface Props {
  user: SingleUser;
}

const UserRowCardMobile = ({ user }: Props) => {
  const roleData = user.roles?.length > 0 ? user.roles[0] : ({} as Role);

  return (
    <div className={styles.user_row_card_mobile}>
      <Flex vertical gap="10px">
        <div>
          <Show>
            <Show.When isTrue={!!roleData.name}>
              {roleData.name === 'Admin' ? (
                <Tag className="tag-role tag-role-admin">
                  <StarFilled width={10} /> {roleData.name}
                </Tag>
              ) : (
                <Tag className="tag-role">{roleData.name}</Tag>
              )}
            </Show.When>
            <Show.Else>
              <UnassignedTag />
            </Show.Else>
          </Show>
        </div>
        <Flex vertical>
          <span className={styles.text_email}>{user.email}</span>
          <span className={styles.text_username}>@{user.username}</span>
        </Flex>
      </Flex>
      <div>
        <div className="popup_actions_primary_vertical">
          <UserActions user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserRowCardMobile;
