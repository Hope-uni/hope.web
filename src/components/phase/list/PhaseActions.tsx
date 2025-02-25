import HModal from '@/components/common/Modals';
import PhaseForm from '@/components/phase/form';
import PopupActions from '@/components/table/PopupActions';
import { FormPhaseErrors, TEAPhase } from '@/models/schema';
import { ActionType } from '@/models/types';
import { EditPhaseService } from '@/services/PECS/pecs.service';
import { ParseToErrorAntd } from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import { deepEqual, removeKeysFromObject } from '@/utils/objects';
import { Form, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  phase: TEAPhase;
  actions?: Array<ActionType>;
  classWrapper?: string;
}

const PhaseActions = ({ phase, actions = ['edit'], classWrapper }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (openEdit) {
      form?.setFieldsValue(phase);
    }
  }, [form, openEdit, phase]);

  const handleOpenEdit = useCallback(() => {
    setOpenEdit(true);
  }, []);

  const applyErrors = useCallback(
    (validationErrors: FormPhaseErrors) => {
      const errors = validationErrors;
      form.setFields(ParseToErrorAntd(errors));
    },
    [form],
  );

  const handleEdit = useCallback(async () => {
    try {
      setLoading(true);

      const validateFormUser = await form.validateFields();

      if (validateFormUser.errorFields) {
        return;
      }

      const values = form.getFieldsValue();

      const res = await EditPhaseService(values, String(phase.id));

      if (res.error && res.statusCode !== 201) {
        if (
          res.validationErrors &&
          Object.keys(res.validationErrors).length > 0
        ) {
          applyErrors(res.validationErrors as FormPhaseErrors);
        }
        setLoading(false);
        return;
      }

      message.success(res.message);
      setLoading(false);
      setOpenEdit(false);
    } catch (error) {
      setLoading(false);
    }
  }, [applyErrors, form, phase.id]);

  const validateIfFormHasChanged = useCallback(() => {
    let values = form.getFieldsValue();
    let fieldsFiltered = undefined;
    let keyToDelete: (keyof typeof phase)[] = ['id'];

    fieldsFiltered = removeKeysFromObject(phase, keyToDelete);

    if (deepEqual(values, fieldsFiltered)) {
      message.warning(t('feedback.common.not_changed_detect'));
      return;
    }
    handleEdit();
  }, [phase, form, handleEdit, t]);

  return (
    <>
      <PopupActions
        id={phase.id}
        actions={actions}
        route="phases"
        classWrapper={classWrapper}
        onEdit={handleOpenEdit}
      />

      {/* edit phase modal */}
      <HModal
        open={openEdit}
        loading={loading}
        onOpen={setOpenEdit}
        okText={t('Phase.actions.edit.modal.ok_text')}
        okButtonProps={{
          type: 'primary',
          onClick: validateIfFormHasChanged,
          loading: loading,
          className: styles.footer_btn_confirm,
        }}
        title={t('Phase.actions.edit.modal.title')}
      >
        <PhaseForm form={form} />
      </HModal>
    </>
  );
};

export default PhaseActions;
