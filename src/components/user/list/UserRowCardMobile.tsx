import { Show } from '@/components/Show';
import { UnassignedTag, UserVerifiedTag } from '@/components/common';
import UserActions from '@/components/user/list/UserActions';
import { SingleUser, Role } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import { StarFilled } from '@ant-design/icons';
import { Flex, Tag } from 'antd';
import AvatarUserList from '@/components/user/list/AvatarUserList';

interface Props {
  user: SingleUser;
  showActions?: boolean;
}

const UserRowCardMobile = ({ user, showActions }: Props) => {
  const roleData = user.roles?.length > 0 ? user.roles[0] : ({} as Role);

  return (
    <div className={styles.user_row_card_mobile}>
      <Flex
        vertical
        gap="10px"
        style={{
          width: '100%',
        }}
      >
        <div>
          <Flex
            justify="space-between"
            align="center"
            style={{
              width: '100%',
            }}
          >
            <Flex
              style={{
                width: '100%',
              }}
            >
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
              <UserVerifiedTag isVerified={user.isVerified} />
            </Flex>
            {showActions && (
              <div>
                <div className="popup_actions_primary_vertical">
                  <UserActions user={user} />
                </div>
              </div>
            )}
          </Flex>
        </div>
        <Flex vertical>
          <AvatarUserList
            image={user.imageUrl}
            title={user.username}
            description={user.email}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default UserRowCardMobile;
