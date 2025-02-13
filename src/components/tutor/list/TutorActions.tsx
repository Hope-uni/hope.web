import PopupActions from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { useModalDelete } from '@/lib/store/modalDelete';
import { ListTutorResponse } from '@/models/schema';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  tutor: ListTutorResponse;
}

const TutorActions = ({ tutor }: Props) => {
  const { t } = useTranslation();
  const { setOpen, setLoading } = useModalDelete();
  const router = useRouter();

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${tutor.userId}`);
  }, [router, tutor.userId]);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      const res = await DeleteUserByIdHelper(
        ROLES.TUTOR as CurrentRoleTypeDeleteUser,
        String(tutor.id),
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
  }, [setLoading, setOpen, tutor.id]);

  return (
    <PopupActions
      id={tutor.id}
      actions={['show', 'edit', 'delete']}
      route="tutors"
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
