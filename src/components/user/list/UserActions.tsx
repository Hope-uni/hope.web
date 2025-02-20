import PopupActions from '@/components/table/PopupActions';
import { RoutesName } from '@/constants';
import { ROLES } from '@/constants/Role';
import { SingleUser, Role } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import { getFirstRole, validateRole } from '@/utils/session';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  user: SingleUser;
  actions?: Array<ActionType>;
  classWrapper?: string;
}

const UserActions = ({
  user,
  actions = ['show', 'edit', 'delete'],
  classWrapper,
}: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const actionsFiltered = useMemo(() => {
    const roleUser = getFirstRole(user.roles);
    if (validateRole(roleUser?.name, ROLES.ADMIN)) {
      return actions.filter((action) => action !== 'show');
    }
    return actions;
  }, [actions, user.roles]);

  const actionPath = useMemo(() => {
    const roleUser = getFirstRole(user.roles);
    let pathDetail = RoutesName.patient.index;

    if (validateRole(roleUser?.name, ROLES.THERAPIST)) {
      pathDetail = RoutesName.therapist.index;
    }

    if (validateRole(roleUser?.name, ROLES.TUTOR)) {
      pathDetail = RoutesName.tutor.index;
    }

    return {
      detail: pathDetail,
    };
  }, [user.roles]);

  const handleShowDetail = useCallback(() => {
    router.push(`${actionPath.detail}/${user.profileId}`);
  }, [router, user.profileId, actionPath.detail]);

  const handleEdit = useCallback(() => {
    router.push(`${RoutesName.user.edit}/${user.id}`);
  }, [router, user.id]);

  const handleDelete = useCallback(async () => {
    const role = user.roles?.length > 0 ? user.roles[0] : ({} as Role);
    const id = validateRole(role.name, ROLES.ADMIN) ? user.id : user.profileId;

    return await DeleteUserByIdHelper(
      role.name as CurrentRoleTypeDeleteUser,
      id,
    );
  }, [user.id, user.profileId, user.roles]);

  return (
    <PopupActions
      id={user.id}
      actions={actionsFiltered}
      route="users"
      classWrapper={classWrapper}
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
