import { Dropdown, Flex, message } from 'antd';
import React from 'react';
import { Show } from '@/components/Show';
import { useRouter } from '@/intl-navigation';
import { HopeTable } from '@/constants/config';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ActionTableOptionsType, ActionType } from '@/models/types/Table';

interface Props {
  id: number | string;
  actions: Array<ActionType>;
  route?: string;
  onShow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PopupActions({
  id,
  actions,
  route,
  onShow,
  onEdit,
  onDelete,
}: Props) {
  const router = useRouter();

  const HandlesActions = {
    show: () => {
      if (onShow) {
        onShow();
        return;
      }

      if (route) {
        router.push(`/admin/${route}/${id}`);
      }
    },
    edit: () => {
      if (onEdit) {
        onEdit();
        return;
      }

      if (route) {
        router.push(`/admin/${route}/edit/${id}`);
      }
    },
    assign: () => {
      if (onEdit) {
        onEdit();
        return;
      }
    },
    delete: () => {
      if (onDelete) {
        onDelete();
        return;
      }

      message.success('Deleted');
    },
  };

  const handleSelectAction = (action: ActionType) => {
    if (action in HandlesActions) {
      HandlesActions[action]();
    }
  };

  const renderItem = () => {
    return (
      <ul
        className={`popup-actions-dropdown ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical`}
        role="menu"
        data-menu-list="true"
      >
        {HopeTable.actionTableOptions?.map((item: ActionTableOptionsType) => (
          <>
            <Show>
              <Show.When isTrue={actions.includes(item.actionType)}>
                <li
                  className={`ant-dropdown-menu-item ${item.colorClassName}`}
                  role="menuitem"
                  key={item?.key}
                  onClick={() => handleSelectAction(item.actionType)}
                >
                  <item.icon />
                  <span className="ant-dropdown-menu-title-content">
                    {item?.label}
                  </span>
                </li>
              </Show.When>
            </Show>
          </>
        ))}
      </ul>
    );
  };

  return (
    <Flex align="center" justify="center">
      <Dropdown
        className="popup-actions"
        trigger={['click']}
        dropdownRender={renderItem}
      >
        <BsThreeDotsVertical size={'12px'} />
      </Dropdown>
    </Flex>
  );
}
