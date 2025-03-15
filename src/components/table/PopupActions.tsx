import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { HopeTable } from '@/constants/config';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { API_SINGLE_RESPONSE } from '@/models/types';
import { ActionTableOptionsType, ActionType } from '@/models/types/Table';
import styles from '@/styles/modules/partials.module.scss';
import { Button, Dropdown, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RenderModeActionTypes } from './helpers';

interface Props {
  id: number | string;
  actions: Array<ActionType>;
  route?: string;
  modalDeleteTitle?: string | JSX.Element;
  modalDeleteDescription?: string | JSX.Element;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
  onShow?: () => void;
  onEdit?: () => void;
  onDelete?: () => Promise<API_SINGLE_RESPONSE>;
}

export default function PopupActions({
  id,
  actions,
  route,
  modalDeleteTitle,
  modalDeleteDescription,
  classWrapper,
  renderMode = 'popup',
  onShow,
  onEdit,
  onDelete,
}: Props) {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
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
    assign_patient: () => {
      //TODO do something
    },
    assign: () => {
      if (onEdit) {
        onEdit();
        return;
      }
    },
    delete: () => {
      setOpenModalDelete(true);
    },
  };

  const handleDelete = useCallback(async () => {
    try {
      if (!onDelete) {
        return;
      }

      setLoading(true);

      const res = await onDelete();

      if (res.error) {
        openNotification.error({
          description: res.message,
        });
        setLoading(false);
        setOpenModalDelete(false);
        return;
      }

      setLoading(false);
      setOpenModalDelete(false);
      openNotification.success({
        description: res.message,
      });
    } catch (error) {
      setLoading(false);
      setOpenModalDelete(false);
      openNotification.error({
        description: (error as Error).message,
      });
    }
  }, [onDelete, openNotification]);

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
          <div key={item.key}>
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
          </div>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Show>
        <Show.When isTrue={renderMode === 'popup'}>
          <div className={classWrapper}>
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
          </div>
        </Show.When>

        <Show.When isTrue={renderMode === 'delete'}>
          <Button
            className="default-error-color"
            type="default"
            onClick={HandlesActions['delete']}
            loading={loading}
          >
            {t('Actions.delete')}
          </Button>
        </Show.When>
      </Show>
      <HModal
        open={openModalDelete}
        loading={loading}
        onOpen={setOpenModalDelete}
        okText={t('common.modals.delete.btn_ok')}
        okButtonProps={{
          type: 'default',
          onClick: handleDelete,
          loading: loading,
          className: styles.modal_delete_footer_btn_delete,
        }}
        title={modalDeleteTitle}
        className={styles.modal_delete_content}
      >
        <div className={styles.modal_delete_body}>
          <p className={styles.modal_delete_body_description}>
            {modalDeleteDescription}
          </p>
          <p className={styles.modal_delete_body_caption}>
            {t('common.modals.delete.caption')}
          </p>
        </div>
      </HModal>
    </>
  );
}
