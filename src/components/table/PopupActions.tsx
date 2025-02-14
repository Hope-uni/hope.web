import ModalDelete from '@/components/ModalDelete';
import { Show } from '@/components/Show';
import { HopeTable } from '@/constants/config';
import { useModalDelete } from '@/lib/store/modalDelete';
import { ActionTableOptionsType, ActionType } from '@/models/types/Table';
import { Dropdown, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
  id: number | string;
  actions: Array<ActionType>;
  route?: string;
  modalDeleteTitle?: string | JSX.Element;
  modalDeleteDescription?: string | JSX.Element;
  onShow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PopupActions({
  id,
  actions,
  route,
  modalDeleteTitle,
  modalDeleteDescription,
  onShow,
  onEdit,
  onDelete,
}: Props) {
  const router = useRouter();
  const { setOpen } = useModalDelete();
  const [openMenu, setOpenMenu] = useState(false);

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
      setOpen(true);
    },
  };

  const handleSelectAction = (action: ActionType) => {
    if (action in HandlesActions) {
      HandlesActions[action]();
      setOpenMenu(false);
    }
  };

  const handleVisibilityMenu = (flag: boolean) => {
    setOpenMenu(flag);
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
    <>
      <Flex align="center" justify="center">
        <Dropdown
          className="popup-actions"
          trigger={['click']}
          dropdownRender={renderItem}
          open={openMenu}
          onOpenChange={(flag) => handleVisibilityMenu(flag)}
        >
          <BsThreeDotsVertical
            size={'12px'}
            onClick={() => handleVisibilityMenu(true)}
          />
        </Dropdown>
      </Flex>
      <ModalDelete
        title={modalDeleteTitle}
        description={modalDeleteDescription}
        onOk={onDelete}
      />
    </>
  );
}
