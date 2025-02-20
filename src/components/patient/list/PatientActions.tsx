import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import PopupActions from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { SinglePatient } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openNextPhase, setOpenNextPhase] = useState(false);
  const [openAddObservation, setOpenAddObservation] = useState(false);
  const [openAddAchievement, setOpenAddAchievement] = useState(false);

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${patient.userId}`);
  }, [router, patient.userId]);

  const handleDelete = useCallback(async () => {
    return await DeleteUserByIdHelper(
      ROLES.PATIENT as CurrentRoleTypeDeleteUser,
      String(patient.id),
    );
  }, [patient.id]);

  const handleOpenNextPhase = useCallback(() => {
    setOpenNextPhase(true);
  }, []);

  const handleOpenAddObservation = useCallback(() => {
    setOpenAddObservation(true);
  }, []);

  const handleOpenAddAchievement = useCallback(() => {
    setOpenAddAchievement(true);
  }, []);

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
        loading={loading}
        onOpen={setOpenNextPhase}
        okText={t('Patient.actions.next_phase.modal.ok_text')}
        okButtonProps={{
          type: 'default',
          loading: loading,
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
        loading={loading}
        onOpen={setOpenAddObservation}
        okText={t('Patient.actions.add_observation.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          loading: loading,
          className: styles.footer_btn_confirm,
        }}
        title={t('Patient.actions.add_observation.modal.title')}
      >
        <Form
          name="add_observation"
          id="create_user_form_antd"
          layout="vertical"
        >
          <Form.Item
            name="observations"
            label={t('User.fields.observations.label')}
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
        loading={loading}
        onOpen={setOpenAddAchievement}
        okText={t('Patient.actions.add_achievement.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          onClick: handleDelete,
          loading: loading,
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
