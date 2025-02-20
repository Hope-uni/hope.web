import { RenderModeActionTypes } from '@/components/table/helpers';
import PopupActions from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { ListTutorResponse } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  tutor: ListTutorResponse;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const TutorActions = ({
  tutor,
  actions = ['show', 'edit', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${tutor.userId}`);
  }, [router, tutor.userId]);

  const handleDelete = useCallback(async () => {
    return await DeleteUserByIdHelper(
      ROLES.TUTOR as CurrentRoleTypeDeleteUser,
      String(tutor.id),
    );
  }, [tutor.id]);

  return (
    <PopupActions
      id={tutor.id}
      actions={actions}
      route="tutors"
      classWrapper={classWrapper}
      renderMode={renderMode}
      onEdit={handleEdit}
      onDelete={handleDelete}
      modalDeleteTitle={t('Tutor.actions.delete.modal.title')}
      modalDeleteDescription={
        <Trans
          i18nKey="Tutor.actions.delete.modal.description"
          components={{
            StrongValue: <strong>{tutor.fullName}</strong>,
          }}
        />
      }
    />
  );
};

export default TutorActions;
