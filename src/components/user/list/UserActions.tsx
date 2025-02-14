import PopupActions from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { useModalDelete } from '@/lib/store/modalDelete';
import { ListUserResponse, Role } from '@/models/schema';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import { validateRole } from '@/utils/session';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  user: ListUserResponse;
}

const UserActions = ({ user }: Props) => {
  const { t } = useTranslation();
  const { setOpen, setLoading } = useModalDelete();
  const router = useRouter();

  const handleShowDetail = useCallback(() => {
    router.push(`/admin/users/${user.id}`);
  }, [router, user.id]);

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${user.id}`);
  }, [router, user.id]);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      const role = user.roles?.length > 0 ? user.roles[0] : ({} as Role);
      const id = validateRole(role.name, ROLES.ADMIN)
        ? user.id
        : user.profileId;

      const res = await DeleteUserByIdHelper(
        role.name as CurrentRoleTypeDeleteUser,
        id,
      );

      if (res.error) {
        message.error(res.message);
        setLoading(false);
        setOpen(false);
        return;
      }

      setLoading(false);
      setOpen(false);
      message.success(res.message);
    } catch (error) {
      setLoading(false);
      setOpen(false);
      message.error((error as Error).message);
    }
  }, [setLoading, setOpen, user.id, user.profileId, user.roles]);

  const actions = {
    show: {
      redirect: `/admin/users/edit/${user.id}`,
      modal: {
        modalTitle: '',
        modalDescription: '',
        modalRenderContent: <form></form>,
      },
      callback: () => {
        router.push(`/admin/tutor/${user.id}`);
      },
    },
  };

  return (
    <PopupActions
      id={user.id}
      actions={['show', 'edit', 'delete']}
      route="users"
      onEdit={handleEdit}
      onDelete={handleDelete}
      onShow={handleShowDetail}
      modalDeleteTitle={t('User.actions.delete.modal.title')}
      modalDeleteDescription={
        <Trans
          i18nKey="User.actions.delete.modal.description"
          components={{
            StrongValue: <strong>{user.username}</strong>,
          }}
        />
      }
    />
  );
};

export default UserActions;
