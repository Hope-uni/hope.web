import PopupActions from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { useModalDelete } from '@/lib/store/modalDelete';
import { ListPatientResponse, ListTutorResponse } from '@/models/schema';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  patient: ListPatientResponse;
}

const PatientActions = ({ patient }: Props) => {
  const { t } = useTranslation();
  const { setOpen, setLoading } = useModalDelete();
  const router = useRouter();

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${patient.userId}`);
  }, [router, patient.userId]);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      const res = await DeleteUserByIdHelper(
        ROLES.PATIENT as CurrentRoleTypeDeleteUser,
        String(patient.id),
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
  }, [setLoading, setOpen, patient.id]);

  return (
    <PopupActions
      id={patient.id}
      actions={['show', 'edit', 'delete']}
      route="patients"
      onEdit={handleEdit}
      onDelete={handleDelete}
      modalDeleteTitle={t('Patient.actions.delete.modal.title')}
      modalDeleteDescription={
        <Trans
          i18nKey="Patient.actions.delete.modal.description"
          components={{
            StrongValue: <strong>{patient.fullName}</strong>,
          }}
        />
      }
    />
  );
};

export default PatientActions;
