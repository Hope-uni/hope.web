import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import PopupActions from '@/components/table/PopupActions';
import { ROLES } from '@/constants/Role';
import { ListTherapistResponse } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CurrentRoleTypeDeleteUser,
  DeleteUserByIdHelper,
} from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import { achievements } from '__mocks__/achievements';
import { Button, Form, Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  therapist: ListTherapistResponse;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const TherapistActions = ({
  therapist,
  actions = ['show', 'edit', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openAssignPatient, setOpenAssignPatient] = useState(false);

  const handleEdit = useCallback(() => {
    router.push(`/admin/users/edit/${therapist.userId}`);
  }, [router, therapist.userId]);

  const handleDelete = useCallback(async () => {
    return await DeleteUserByIdHelper(
      ROLES.THERAPIST as CurrentRoleTypeDeleteUser,
      String(therapist.id),
    );
  }, [therapist.id]);

  const handleOpenAssignPatient = useCallback(() => {
    setOpenAssignPatient(true);
  }, []);

  return (
    <>
      <PopupActions
        id={therapist.id}
        actions={actions}
        route="therapists"
        classWrapper={classWrapper}
        renderMode={renderMode}
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
      <Show.When isTrue={renderMode === 'assign_patient'}>
        <Button type="default" onClick={handleOpenAssignPatient}>
          {t('Therapist.actions.assign_patients.button_add')}
        </Button>
      </Show.When>

      {/* assign patients to patient modal */}
      <HModal
        open={openAssignPatient}
        loading={loading}
        onOpen={setOpenAssignPatient}
        okText={t('Therapist.actions.assign_patients.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          onClick: handleDelete,
          loading: loading,
          className: styles.footer_btn_confirm,
        }}
        title={t('Therapist.actions.assign_patients.modal.title')}
      >
        <Form
          name="add_observation"
          id="create_user_form_antd"
          layout="vertical"
        >
          <Form.Item
            name="roles"
            label={t('Therapist.fields.assign_patients.label')}
          >
            <Select
              placeholder={t('Therapist.fields.assign_patients.placeholder')}
              mode="multiple"
              className="primary"
            >
              {/* TODO This list is for testing purposes */}
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

export default TherapistActions;
