import PopupActions from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { useModalDelete } from '@/lib/store/modalDelete';
import { ListTherapistResponse } from '@/models/schema';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  therapist: ListTherapistResponse;
}

const TherapistActions = ({ therapist }: Props) => {
  const { t } = useTranslation();
  const { setOpen, setLoading } = useModalDelete();
  const router = useRouter();

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${therapist.userId}`);
  }, [router, therapist.userId]);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      const res = await DeleteUserByIdHelper(
        ROLES.THERAPIST as CurrentRoleTypeDeleteUser,
        String(therapist.id),
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
  }, [setLoading, setOpen, therapist.id]);

  return (
    <PopupActions
      id={therapist.id}
      actions={['show', 'edit', 'delete']}
      route="tutors"
      onEdit={handleEdit}
      onDelete={handleDelete}
      modalDeleteTitle={t('Therapist.actions.delete.modal.title')}
      modalDeleteDescription={
        <Trans
          i18nKey="Therapist.actions.delete.modal.description"
          components={{
            StrongValue: <strong>{therapist.fullName}</strong>,
          }}
        />
      }
    />
  );
};

export default TherapistActions;
