import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import {
  RENDER_MODE_ACTION,
  RenderModeActionTypes,
} from '@/components/table/helpers';
import { PopupActions } from '@/components/table/PopupActions';
import AssignPatientForm from '@/components/therapist/form/AssignPatientForm';
import { ROLES } from '@/constants/guards';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useTherapistForm from '@/hooks/useTherapistForm';
import { useOverlayStore } from '@/lib/store';
import { SingleTutorTherapist } from '@/models/schema';
import { ActionType } from '@/models/types';
import { AssignPatientToTherapistService } from '@/services';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import { Button, Form } from 'antd';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

interface Props {
  therapist: SingleTutorTherapist;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const TherapistActions = ({
  therapist,
  actions = ['show', 'edit', 'assign_patient', 'delete'],
  classWrapper,
  renderMode = RENDER_MODE_ACTION.POPUP,
}: Props) => {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const router = useRouter();
  const [assignForm] = Form.useForm();
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const [loadingForm, setLoadingForm] = useState(false);
  const [openAssignPatient, setOpenAssignPatient] = useState(false);

  const actionsDisabled: Array<ActionType> = useMemo(() => {
    return !therapist.isVerified ? ['edit', 'assign_patient'] : [];
  }, [therapist.isVerified]);

  const {
    availableForTherapistList,
    getAvailableForTherapist,
    updateQueriesAfterAssign,
  } = useTherapistForm();

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${therapist.userId}`);
  }, [router, therapist.userId]);

  const handleDelete = useCallback(async () => {
    return await DeleteUserByIdHelper(
      ROLES.THERAPIST as CurrentRoleTypeDeleteUser,
      String(therapist.id),
    );
  }, [therapist.id]);

  const handleAssign = useCallback(async () => {
    try {
      if (!therapist?.id) {
        return;
      }

      setLoadingForm(true);

      const validateFormAssign = await assignForm.validateFields();

      if (validateFormAssign.errorFields) {
        return;
      }

      const values = assignForm.getFieldsValue();

      const res = await AssignPatientToTherapistService({
        therapistId: therapist?.id,
        patients: [...values.patients],
      });

      if (res.error && res.statusCode !== 201) {
        openNotification.error({
          description: res.message,
        });
        setLoadingForm(false);
        return;
      }

      await updateQueriesAfterAssign([...values.patients], therapist.id);

      openNotification.success({
        description: res.message,
      });

      setLoadingForm(false);
      setOpenAssignPatient(false);
      assignForm.resetFields();
    } catch (error) {
      setLoadingForm(false);
    }
  }, [assignForm, openNotification, therapist.id, updateQueriesAfterAssign]);

  const handleOpenAssignPatient = useCallback(async () => {
    await getAvailableForTherapist();
    setOpenAssignPatient(true);
    setLoading(false);
  }, [getAvailableForTherapist, setLoading]);

  return (
    <>
      <PopupActions
        id={therapist.id}
        actions={actions}
        actionsDisabled={actionsDisabled}
        route="therapists"
        classWrapper={classWrapper}
        renderMode={renderMode}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAssign={handleOpenAssignPatient}
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
      <Show.When isTrue={renderMode === RENDER_MODE_ACTION.ASSIGN_PATIENT}>
        <Button
          type="default"
          onClick={handleOpenAssignPatient}
          disabled={!therapist.isVerified}
        >
          {t('Therapist.actions.assign_patients.button_add')}
        </Button>
      </Show.When>

      {/* assign patients to patient modal */}
      <HModal
        open={openAssignPatient}
        width={600}
        loading={loadingForm}
        onOpen={setOpenAssignPatient}
        okText={t('Therapist.actions.assign_patients.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          onClick: handleAssign,
          loading: loadingForm,
          className: styles.footer_btn_confirm,
        }}
        title={t('Therapist.actions.assign_patients.modal.title')}
      >
        <AssignPatientForm
          form={assignForm}
          initialPatients={availableForTherapistList}
        />
      </HModal>
    </>
  );
};

export default memo(TherapistActions);
