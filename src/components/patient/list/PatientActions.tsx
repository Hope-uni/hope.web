import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import { PopupActions } from '@/components/table/PopupActions';
import { QueryKeys } from '@/constants';
import { ROLES } from '@/constants/Role';
import { UserRules } from '@/constants/rules';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useInvalidateQueries from '@/hooks/useInvalidateQueries';
import { DetailPatient, Observation, SinglePatient } from '@/models/schema';
import { ActionType, API_RESPONSE } from '@/models/types';
import { AddObservationToPatientService } from '@/services';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
  ParseToErrorAntd,
} from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import stylesPatient from '@/styles/modules/patient.module.scss';
import { achievements } from '__mocks__/achievements';
import { Button, Flex, Form, Grid, Select, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BsChevronDoubleUp } from 'react-icons/bs';

const { useBreakpoint } = Grid;

interface FormAddObservationErrors {
  description: string;
}

interface Props {
  patient: SinglePatient;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const PatientActions = ({
  patient,
  actions = ['show', 'edit', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const { queryClient } = useInvalidateQueries();
  const { openNotification } = useOpenNotification();
  const router = useRouter();
  const [loadingForm, setLoadingForm] = useState(false);
  const [openNextPhase, setOpenNextPhase] = useState(false);
  const [openAddObservation, setOpenAddObservation] = useState(false);
  const [openAddAchievement, setOpenAddAchievement] = useState(false);

  const [formObservation] = Form.useForm();

  const handleOpenNextPhase = useCallback(() => {
    setOpenNextPhase(true);
  }, []);

  const handleOpenAddObservation = useCallback(() => {
    setOpenAddObservation(true);
  }, []);

  const handleOpenAddAchievement = useCallback(() => {
    setOpenAddAchievement(true);
  }, []);

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

      await queryClient.setQueryData(
        [QueryKeys.User.FindByRole, [String(patient.id), ROLES.PATIENT]],
        (oldData: API_RESPONSE<DetailPatient>) => {
          if (!oldData?.data) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              observations: [
                res.data as Observation,
                ...(oldData?.data.observations || []),
              ],
            },
          };
        },
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
    queryClient,
  ]);

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
      </Show>

      {/* next phase modal */}
      <HModal
        open={openNextPhase}
        loading={loadingForm}
        onOpen={setOpenNextPhase}
        okText={t('Patient.actions.next_phase.modal.ok_text')}
        okButtonProps={{
          type: 'default',
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
          onClick: handleDelete,
          loading: loadingForm,
          className: styles.footer_btn_confirm,
        }}
        title={t('Patient.actions.add_achievement.modal.title')}
      >
        <Form
          name="add_achievement"
          id="create_user_form_antd"
          layout="vertical"
        >
          <Form.Item
            name="roles"
            label={t('Patient.fields.assign_achievements.label')}
          >
            <Select
              placeholder={t('Patient.fields.assign_achievements.placeholder')}
              mode="multiple"
              className="primary"
            >
              {achievements.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </HModal>
    </>
  );
};

export default PatientActions;
