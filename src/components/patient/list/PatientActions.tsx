import HModal from '@/components/common/Modals';
import AssignAchievementForm from '@/components/patient/form/AssignAchievementForm';
import ChangeTherapistForm from '@/components/patient/form/ChangeTherapistForm';
import UnassignAchievementForm from '@/components/patient/form/UnassignAchievementForm';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import { PopupActions } from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { UserRules } from '@/constants/rules';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import usePatientForm from '@/hooks/usePatientForm';
import { useOverlayStore } from '@/lib/store';
import { Achievement, Observation, SinglePatient } from '@/models/schema';
import { ActionType, NotificationContent } from '@/models/types';
import {
  AddObservationToPatientService,
  ChangeTherapistService,
} from '@/services';
import { AssignAchievementService } from '@/services/achievements/achievements.service';
import { PhaseShiftService } from '@/services/PECS/pecs.service';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
  ParseToErrorAntd,
} from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import stylesPatient from '@/styles/modules/patient.module.scss';
import { Button, Flex, Form, Grid, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BsChevronDoubleUp } from 'react-icons/bs';
import { useShallow } from 'zustand/react/shallow';

const { useBreakpoint } = Grid;

interface FormAddObservationErrors {
  description: string;
}

interface Props {
  patient: SinglePatient;
  achievementsAssigned?: Achievement[];
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const PatientActions = ({
  patient,
  achievementsAssigned = [],
  actions = ['show', 'edit', 'change_therapist_to_patient', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const router = useRouter();
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const [loadingForm, setLoadingForm] = useState(false);
  const [openNextPhase, setOpenNextPhase] = useState(false);
  const [openAddObservation, setOpenAddObservation] = useState(false);
  const [openAddAchievement, setOpenAddAchievement] = useState(false);
  const [openUnassignAchievement, setOpenUnassignAchievement] = useState(false);
  const [openChangeTherapist, setOpenChangeTherapist] = useState(false);

  const {
    availableTherapistList,
    achievementList,
    getAvailableTherapistForPatient,
    getListAchievements,
    updateQueriesAfterChangeTherapist,
    updateQueriesAfterAddObservation,
    updateQueriesAfterUpdateAssignment,
    updateQueriesAfterUnassignAssignment,
  } = usePatientForm(patient.id);

  const [formObservation] = Form.useForm();
  const [formAddAchievement] = Form.useForm();
  const [formChangeTherapist] = Form.useForm();

  const handleOpenNextPhase = useCallback(() => {
    setOpenNextPhase(true);
  }, []);

  const handleOpenAddObservation = useCallback(() => {
    setOpenAddObservation(true);
  }, []);

  const handleOpenAddAchievement = useCallback(async () => {
    await getListAchievements();
    setOpenAddAchievement(true);
    setLoading(false);
  }, [getListAchievements, setLoading]);

  const handleOpenUnassignAchievement = useCallback(async () => {
    setOpenUnassignAchievement(true);
  }, []);

  const handleOpenChangeTherapist = useCallback(async () => {
    await getAvailableTherapistForPatient();
    setOpenChangeTherapist(true);
    setLoading(false);
  }, [getAvailableTherapistForPatient, setLoading]);

  const applyErrorsAddObservation = useCallback(
    (validationErrors: FormAddObservationErrors) => {
      const errors = ParseToErrorAntd(validationErrors);
      if (errors.length > 0) {
        formObservation.setFields(errors);
      }
    },
    [formObservation],
  );

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${patient.userId}`);
  }, [router, patient.userId]);

  const handleDelete = useCallback(async () => {
    return await DeleteUserByIdHelper(
      ROLES.PATIENT as CurrentRoleTypeDeleteUser,
      String(patient.id),
    );
  }, [patient.id]);

  const handleAddObservation = useCallback(async () => {
    try {
      setLoadingForm(true);

      const validateForm = await formObservation.validateFields();

      if (validateForm.errorFields) {
        return;
      }

      const values = formObservation.getFieldsValue();

      const res = await AddObservationToPatientService(
        patient.id,
        values.description,
      );

      if (res.error && res.statusCode !== 201) {
        if (
          res.validationErrors &&
          Object.keys(res.validationErrors).length > 0
        ) {
          applyErrorsAddObservation(
            res.validationErrors as FormAddObservationErrors,
          );
        }
        setLoadingForm(false);
        return;
      }

      await updateQueriesAfterAddObservation(
        patient.id,
        res.data as Observation,
      );

      openNotification.success({
        description: res.message,
      });

      setLoadingForm(false);
      setOpenAddObservation(false);
      formObservation.resetFields();
    } catch (error) {
      setLoadingForm(false);
    }
  }, [
    applyErrorsAddObservation,
    formObservation,
    openNotification,
    patient.id,
    updateQueriesAfterAddObservation,
  ]);

  const handleChangeTherapist = useCallback(async () => {
    try {
      setLoadingForm(true);

      const validateForm = await formChangeTherapist.validateFields();

      if (validateForm.errorFields) {
        return;
      }

      const values = formChangeTherapist.getFieldsValue();

      const res = await ChangeTherapistService(patient.id, values.therapist);

      if (res.error && res.statusCode !== 201) {
        openNotification.error({
          description: res.message,
        });
        setLoadingForm(false);
        return;
      }

      await updateQueriesAfterChangeTherapist();

      openNotification.success({
        description: res.message,
      });

      setLoadingForm(false);
      setOpenChangeTherapist(false);
      formChangeTherapist.resetFields();
    } catch (error) {
      setLoadingForm(false);
    }
  }, [
    formChangeTherapist,
    openNotification,
    patient.id,
    updateQueriesAfterChangeTherapist,
  ]);

  const handleAssignAchievement = useCallback(async () => {
    try {
      setLoadingForm(true);

      const validateForm = await formAddAchievement.validateFields();

      if (validateForm.errorFields) {
        return;
      }

      const values = formAddAchievement.getFieldsValue();

      const res = await AssignAchievementService({
        patientId: patient.id,
        achievementId: values.achievementId,
      });

      if (res.error && res.statusCode !== 201) {
        openNotification.error({
          description: res.message,
        });
        setLoadingForm(false);
        return;
      }

      await updateQueriesAfterUpdateAssignment(
        patient.id,
        res.data as Achievement,
      );

      openNotification.success({
        description: res.message,
      });

      setLoadingForm(false);
      setOpenAddAchievement(false);
      formAddAchievement.resetFields();
    } catch (error) {
      setLoadingForm(false);
    }
  }, [
    formAddAchievement,
    openNotification,
    patient.id,
    updateQueriesAfterUpdateAssignment,
  ]);

  const handlePhaseShift = useCallback(async () => {
    try {
      setLoadingForm(true);

      const res = await PhaseShiftService(patient.id);

      if (res.error && res.statusCode !== 201) {
        let optionsNotification: NotificationContent = {
          description: res.message,
        };

        if (res.statusCode === 500) {
          optionsNotification = {
            ...optionsNotification,
            message: t('feedback.notification.error.messageErrorServer'),
          };
        }

        openNotification.error(optionsNotification);
      } else {
        openNotification.success({
          description: res.message,
        });
      }

      setLoadingForm(false);
      setOpenNextPhase(false);
    } catch (error) {
      setLoadingForm(false);
    }
  }, [openNotification, patient.id, t]);

  return (
    <>
      <Show>
        <Show.When isTrue={renderMode !== 'next_phase'}>
          <PopupActions
            id={patient.id}
            actions={actions}
            route="patients"
            classWrapper={classWrapper}
            renderMode={renderMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onChangeAssignment={handleOpenChangeTherapist}
            onAssign={handleOpenAddAchievement}
            onUnassign={handleOpenUnassignAchievement}
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
        </Show.When>

        <Show.When isTrue={renderMode === 'next_phase'}>
          <Flex
            className={stylesPatient.upgrade_phase}
            gap={4}
            onClick={handleOpenNextPhase}
          >
            <BsChevronDoubleUp size="18px" />
            <Typography.Text
              underline
              className={stylesPatient.upgrade_phase_text}
            >
              {t('Actions.Upload_phase')}
            </Typography.Text>
          </Flex>
        </Show.When>

        <Show.When isTrue={renderMode === 'add_observation'}>
          <Button
            type="default"
            className={styles.btn_add_observation}
            onClick={handleOpenAddObservation}
          >
            {screens.sm
              ? t('Patient.actions.add_observation.button_add')
              : t('Patient.actions.add_observation.button_add_mobile')}
          </Button>
        </Show.When>

        <Show.When isTrue={renderMode === 'assign_achievement'}>
          <Button type="default" onClick={handleOpenAddAchievement}>
            {screens.sm
              ? t('Patient.actions.add_achievement.button_add')
              : t('Patient.actions.add_achievement.button_add_mobile')}
          </Button>
        </Show.When>

        <Show.When isTrue={renderMode === 'unassign_achievement'}>
          <span className={styles.action_unassign_achievement_btn_delete}>
            <Button
              type="default"
              onClick={handleOpenUnassignAchievement}
              className={styles.btn_delete}
            >
              {screens.sm
                ? t('Patient.actions.unassign_achievement.button_add')
                : t('Patient.actions.unassign_achievement.button_add_mobile')}
            </Button>
          </span>
        </Show.When>
      </Show>

      {/* phase shift modal */}
      <HModal
        open={openNextPhase}
        loading={loadingForm}
        onOpen={setOpenNextPhase}
        okText={t('Patient.actions.next_phase.modal.ok_text')}
        okButtonProps={{
          type: 'default',
          onClick: handlePhaseShift,
          loading: loadingForm,
          className: styles.footer_btn_confirm,
        }}
        title={t('Patient.actions.next_phase.modal.title')}
        className={styles.modal_next_phase_content}
      >
        <div className={styles.modal_delete_body}>
          <p className={styles.modal_delete_body_description}>
            {
              <Trans
                i18nKey="Patient.actions.next_phase.modal.description"
                components={{
                  StrongValue: <strong>{patient.fullName}</strong>,
                }}
              />
            }
          </p>
          <p className={styles.modal_delete_body_caption}>
            {t('common.modals.delete.caption')}
          </p>
        </div>
      </HModal>

      {/* add new observation modal */}
      <HModal
        open={openAddObservation}
        loading={loadingForm}
        onOpen={setOpenAddObservation}
        okText={t('Patient.actions.add_observation.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          onClick: handleAddObservation,
          loading: loadingForm,
          className: styles.footer_btn_confirm,
        }}
        title={t('Patient.actions.add_observation.modal.title')}
      >
        <Form
          name="add_observation"
          id="create_user_form_antd"
          layout="vertical"
          form={formObservation}
        >
          <Form.Item
            name="description"
            label={t('User.fields.observations.label')}
            rules={UserRules.user.observations}
          >
            <TextArea
              rows={4}
              placeholder={t('User.fields.observations.placeholder')}
            />
          </Form.Item>
        </Form>
      </HModal>

      {/* assign achievement to patient modal */}
      <HModal
        open={openAddAchievement}
        loading={loadingForm}
        onOpen={setOpenAddAchievement}
        okText={t('Patient.actions.add_achievement.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          onClick: handleAssignAchievement,
          loading: loadingForm,
          className: styles.footer_btn_confirm,
        }}
        title={t('Patient.actions.add_achievement.modal.title')}
      >
        <AssignAchievementForm
          form={formAddAchievement}
          achievementList={achievementList}
        />
      </HModal>

      {/* unassign achievement to patient modal */}
      <HModal
        open={openUnassignAchievement}
        loading={loadingForm}
        onOpen={setOpenUnassignAchievement}
        footer={null}
        title={t('Patient.actions.unassign_achievement.modal.title')}
      >
        <UnassignAchievementForm
          achievementList={achievementsAssigned}
          patientId={patient.id}
          updateQueriesAfterUnassignAssignment={
            updateQueriesAfterUnassignAssignment
          }
        />
      </HModal>

      {/* change therapist assigned to patient modal */}
      <HModal
        open={openChangeTherapist}
        loading={loadingForm}
        onOpen={setOpenChangeTherapist}
        okText={t('Patient.actions.change_therapist.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          onClick: handleChangeTherapist,
          loading: loadingForm,
          className: styles.footer_btn_confirm,
        }}
        title={t('Patient.actions.change_therapist.modal.title')}
      >
        <ChangeTherapistForm
          form={formChangeTherapist}
          availableTherapistList={availableTherapistList}
        />
      </HModal>
    </>
  );
};

export default PatientActions;
