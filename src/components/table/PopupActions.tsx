import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { HopeTable } from '@/constants/config';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useInvalidateQueries from '@/hooks/useInvalidateQueries';
import { API_SINGLE_RESPONSE } from '@/models/types';
import { ActionTableOptionsType, ActionType } from '@/models/types/Table';
import styles from '@/styles/modules/partials.module.scss';
import { Button, Dropdown, Flex, Grid, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RenderModeActionTypes } from './helpers';

const { useBreakpoint } = Grid;

interface Props {
  id: number | string;
  actions: Array<ActionType>;
  route?: string;
  modalDeleteTitle?: string | JSX.Element;
  modalDeleteDescription?: string | JSX.Element;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
  queryKey?: string;
  displayOutsidePopup?: boolean;
  onShow?: () => void;
  onEdit?: () => void;
  onAssign?: () => void;
  onUnassign?: () => void;
  onChangeAssignment?: () => void;
  onDelete?: () => Promise<API_SINGLE_RESPONSE>;
}

export const PopupActions = ({
  id,
  actions,
  route,
  modalDeleteTitle,
  modalDeleteDescription,
  classWrapper,
  renderMode = 'popup',
  queryKey,
  displayOutsidePopup = false,
  onShow,
  onEdit,
  onAssign,
  onUnassign,
  onChangeAssignment,
  onDelete,
}: Props) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const { invalidateQueries } = useInvalidateQueries();
  const { openNotification } = useOpenNotification();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const visibleActions = useMemo(
    () =>
      HopeTable.actionTableOptions.filter((item) =>
        actions.includes(item.actionType),
      ),
    [actions],
  );

  const handleCallback = useCallback((callback?: () => void) => {
    if (callback) {
      callback();
      return true;
    }
    return false;
  }, []);

  const handleRoute = useCallback(
    (path: string) => {
      if (route && id) {
        router.push(`/admin/${route}${path}`);
      }
    },
    [id, route, router],
  );

  const HandlesActions = {
    show: () => {
      if (!handleCallback(onShow)) {
        handleRoute(`/${id}`);
      }
    },
    edit: () => {
      if (!handleCallback(onEdit)) {
        handleRoute(`/edit/${id}`);
      }
    },
    assign_patient: () => {
      handleCallback(onAssign);
    },
    change_therapist_to_patient: () => {
      handleCallback(onChangeAssignment);
    },
    assign_activity: () => {
      handleCallback(onAssign);
    },
    unassign_activity: () => {
      handleCallback(onUnassign);
    },
    assign: () => {
      handleCallback(onAssign);
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

      if (queryKey) {
        await invalidateQueries([queryKey]);
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
  }, [invalidateQueries, onDelete, openNotification, queryKey]);

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
        className={`popup-actions-dropdown ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical table-popup-actions`}
        role="menu"
        data-menu-list="true"
      >
        {visibleActions?.map((item: ActionTableOptionsType) => (
          <div key={item.key}>
            <li
              className={`ant-dropdown-menu-item item-popup-action ${item.colorClassName}`}
              role="menuitem"
              key={item?.key}
              onClick={() => handleSelectAction(item.actionType)}
            >
              <item.icon />
              <span className="ant-dropdown-menu-title-content">
                {item?.label}
              </span>
            </li>
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <Show>
        <Show.When isTrue={renderMode === 'popup'}>
          <>
            {screens.sm && displayOutsidePopup ? (
              <div
                className={`popup-actions-list-container table-popup-actions`}
              >
                {visibleActions?.map((item: ActionTableOptionsType) => (
                  <Tooltip key={item?.key} title={item.label}>
                    <span
                      className={`item-popup-action ${item.colorClassName}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSelectAction(item.actionType);
                      }}
                    >
                      <item.icon />
                    </span>
                  </Tooltip>
                ))}
              </div>
            ) : (
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
            )}
          </>
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
    </div>
  );
};
